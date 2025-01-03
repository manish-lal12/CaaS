"use server";
import prisma from "@/lib/db";
import axios from "axios";
import { inbound_rules_schema } from "@/lib/zod";
import { INFRA_BE_URL } from "@/lib/vars";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { CfClient } from "@/lib/cloudflare.";

export async function createInboundRule({
  domain_name,
  container_port,
  config_name,
  container_name,
}: {
  domain_name: string;
  container_port: number;
  config_name: string;
  container_name: string;
}) {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  try {
    // validation check
    const validation = inbound_rules_schema.safeParse({
      config_name: config_name,
      domain_name: domain_name,
      port: container_port,
    });

    if (!validation.success) {
      return {
        success: false,
        message: `Validation failed: ${validation.error.errors
          .map((err) => err.message)
          .join(", ")}`,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const container = await prisma.containers.findUnique({
      where: {
        name: container_name,
      },
    });

    // check if domain is already allocated
    const doesDomainAlreadyExists = await prisma.inbound_rules.findUnique({
      where: {
        domain_name: domain_name,
      },
    });

    if (doesDomainAlreadyExists) {
      return {
        success: false,
        message: "Domain Name is already in use",
      };
    }

    const create_dns = await CfClient.dns.records.create({
      type: "A",
      zone_id: process.env.CLOUDFLARE_ZONE_ID as string,
      name: domain_name,
      content: process.env.ORACLE_NODE_IP as string,
      proxied: true,
      comment: user?.id as string,
    });

    const res = await prisma.inbound_rules.create({
      data: {
        node: "oracle_arm",
        rule_name: config_name,
        domain_name: domain_name,
        service_protocol: "http",
        container_ip: container?.ip_address as string,
        port: container_port,
        userId: user?.id as string,
        containersName: container?.name as string,
        cloudflare_record_id: create_dns.id as string,
        cloudflare_zone: process.env.CLOUDFLARE_ZONE_ID as string,
      },
    });

    const createInboundRulesResponse = await axios.post(
      INFRA_BE_URL + "/nginx",
      {
        config_id: res.id,
        domain_name: domain_name,
        // maybe changed
        protocol: "http",
        ip: container?.ip_address,
        port: container_port,
        container_name: container?.name,
      }
    );
    if (createInboundRulesResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "Error, failed to create inbound rule",
      };
    }

    revalidatePath("/console/containers/[container_id]");
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to create inbound rule",
    };
  }
}

export async function editInboundRule({
  config_name,
  domain_name,
  container_port,
  inbound_rule_id,
}: {
  config_name: string;
  domain_name: string;
  container_port: number;
  inbound_rule_id: string;
}) {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  try {
    //validation
    const validation = inbound_rules_schema.safeParse({
      config_name,
      domain_name,
      port: container_port,
    });
    if (!validation.success) {
      return {
        success: false,
        message: `Validation failed: ${validation.error.errors
          .map((err) => err.message)
          .join(", ")}`,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const rule = await prisma.inbound_rules.findUnique({
      where: {
        id: inbound_rule_id,
      },
    });

    if (!rule) {
      return {
        success: false,
        message: "Inbound rule not found",
      };
    }

    const inbound_rule = await prisma.inbound_rules.findUnique({
      where: {
        id: inbound_rule_id,
        userId: user?.id as string,
      },
    });

    if (!inbound_rule) {
      return {
        success: false,
        message: "Inbound rule not found",
      };
    }

    const container = await prisma.containers.findUnique({
      where: {
        name: rule.containersName,
      },
    });

    const editInboundRulesResponse = await axios.post(
      INFRA_BE_URL + "/edit_nginx",
      {
        config_id: inbound_rule.id,
        domain_name: domain_name,
        // maybe changed
        protocol: "http",
        ip: container?.ip_address,
        port: container_port,
        container_name: container?.name,
      }
    );
    if (editInboundRulesResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "Error, failed to create inbound rule",
      };
    }

    const update_dns_record = await CfClient.dns.records.update(
      inbound_rule.cloudflare_record_id,
      {
        type: "A",
        zone_id: inbound_rule.cloudflare_zone,
        name: domain_name,
        content: process.env.ORACLE_NODE_IP as string,
        proxied: true,
        comment: user?.id as string,
      }
    );

    await prisma.inbound_rules.update({
      where: {
        id: inbound_rule_id,
        userId: user?.id as string,
      },
      data: {
        rule_name: config_name,
        domain_name,
        port: container_port,
        cloudflare_record_id: update_dns_record.id,
      },
    });

    return {
      success: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to edit inbound rule",
    };
  }
}

export async function deleteInboundRule({
  inbound_rule_id,
}: {
  inbound_rule_id: string;
}) {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    const rule = await prisma.inbound_rules.findUnique({
      where: {
        id: inbound_rule_id,
        userId: user?.id as string,
      },
    });
    if (!rule) {
      return {
        success: false,
        message: "Inbound rule not found",
      };
    }

    const deleteInboundRuleResponse = await axios.delete(
      INFRA_BE_URL + "/nginx",
      {
        data: {
          config_id: rule.id,
          container_name: rule?.containersName,
        },
      }
    );

    if (deleteInboundRuleResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "Error, failed to delete inbound rule",
      };
    }

    await CfClient.dns.records.delete(rule.cloudflare_record_id, {
      zone_id: process.env.CLOUDFLARE_ZONE_ID as string,
    });

    await prisma.inbound_rules.delete({
      where: {
        id: inbound_rule_id,
      },
    });

    revalidatePath("/console/containers/[container_id]");
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to delete inbound rule",
    };
  }
}
