"use server";
import prisma from "@/lib/db";
import { DEFAULT_VPC_NAME, INFRA_BE_URL } from "@/lib/vars";
import axios from "axios";
import { v4 as uuid } from "uuid";

export async function initializeUser({ username }: { username: string }) {
  const userEmail = "abc@gmail.com";
  const vpcID = uuid();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    const userID = user?.id as string;

    const availableVPC = await prisma.available_vpc.findFirst({
      where: {
        used: false,
      },
    });
    if (!availableVPC) {
      return {
        success: false,
        message: "No available VPC",
      };
    }
    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        username: username,
      },
    });

    const createNetworkResponse = await axios.post(INFRA_BE_URL, {
      network_name: vpcID,
      network_subnet: availableVPC?.cidr,
      network_gateway: availableVPC?.gateway,
    });
    if (createNetworkResponse.data !== 0) {
      return {
        success: false,
        message: "error, failed to create network",
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.available_vpc.update({
        where: {
          id: availableVPC?.id,
        },
        data: {
          used: true,
        },
      });
      await tx.vpc.create({
        data: {
          id: vpcID,
          vpc_name: DEFAULT_VPC_NAME,
          node: "oracle_arm",
          network: availableVPC?.network as string,
          cidr: availableVPC?.cidr as string,
          gateway: availableVPC?.gateway as string,
          userId: userID,
          available_vpcId: availableVPC?.id as string,
        },
      });
    });

    return {
      success: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed creating network try again",
    };
  }
}
