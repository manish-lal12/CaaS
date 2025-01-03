"use server";
import prisma from "@/lib/db";
import axios from "axios";
import { container_create_schema } from "@/lib/zod";
import { ContainerActions, INFRA_BE_URL } from "@/lib/vars";
import { v4 as uuid } from "uuid";
import { $Enums } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function startContainer({
  container_name,
}: {
  container_name: string;
}) {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    const container = await prisma.containers.findUnique({
      where: {
        name: container_name,
        userId: user?.id,
      },
    });
    if (!container) {
      return {
        success: false,
        message: "Error, container not found",
      };
    }
    const startContainerResponse = await axios.post(
      INFRA_BE_URL + "/container_actions",
      {
        container_name: container_name,
        action: ContainerActions.START,
      }
    );
    if (startContainerResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "Error, failed to start the container",
      };
    }
    await prisma.containers.update({
      where: {
        name: container_name,
      },
      data: {
        state: $Enums.CONTAINER_STATE.STARTED,
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
      message: "Failed to start the container",
    };
  }
}

export async function stopContainer({
  container_name,
}: {
  container_name: string;
}) {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const container = await prisma.containers.findUnique({
      where: {
        name: container_name,
        userId: user?.id,
      },
    });

    if (!container) {
      return {
        success: false,
        message: "Error, container not found",
      };
    }

    const stopContainerResponse = await axios.post(
      INFRA_BE_URL + "/container_actions",
      {
        container_name: container_name,
        action: ContainerActions.STOP,
      }
    );
    if (stopContainerResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "Error, failed to stop the container",
      };
    }
    await prisma.containers.update({
      where: {
        name: container_name,
      },
      data: {
        state: $Enums.CONTAINER_STATE.STOPPED,
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
      message: "Failed to stop the container",
    };
  }
}

export async function deleteContainer({
  container_name,
}: {
  container_name: string;
}) {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const container = await prisma.containers.findUnique({
      where: {
        name: container_name,
        userId: user?.id,
      },
      include: {
        ssh_config: true,
      },
    });
    if (!container) {
      return {
        success: false,
        message: "Error, container not found",
      };
    }
    // Delete container
    const deleteContainerResponse = await axios.delete(
      INFRA_BE_URL + "/container",
      {
        data: {
          container_name: container_name,
        },
      }
    );
    if (deleteContainerResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "failed to delete container",
      };
    }

    // Delete ssh files
    const deleteSSHFiles = await axios.delete(
      INFRA_BE_URL + "/authorized_keys",
      {
        data: {
          user_id: user?.id,
          container_name: container_name,
        },
      }
    );
    if (deleteSSHFiles.data.return_code !== 0) {
      return {
        success: false,
        message: "failed to delete ssh files",
      };
    }

    // Log the event where the ssh tunnel was already stopped
    await axios.delete(INFRA_BE_URL + "/sshtunnel", {
      data: {
        ssh_tunnel_pid: container.ssh_config.ssh_tunnel_process_id,
      },
    });

    await prisma.$transaction(async (tx) => {
      await tx.containers.delete({
        where: {
          name: container_name,
        },
      });
      const res = await tx.ssh_config.delete({
        where: {
          id: container.ssh_config.id,
        },
      });
      await tx.available_ssh_proxy_ports.update({
        where: {
          id: res.available_ssh_proxy_portsId,
        },
        data: {
          used: false,
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
      message: "Failed to delete container",
    };
  }
}

export async function restartContainer({
  container_name,
}: {
  container_name: string;
}) {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const container = await prisma.containers.findUnique({
      where: {
        name: container_name,
        userId: user?.id,
      },
    });

    if (!container) {
      return {
        success: false,
        message: "Error, container not found",
      };
    }

    const restartContainerResponse = await axios.post(
      INFRA_BE_URL + "/container_actions",
      {
        container_name: container_name,
        action: ContainerActions.RESTART,
      }
    );
    if (restartContainerResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "Error, failed to restart container",
      };
    }
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to restart container",
    };
  }
}

export async function createContainer({
  container_name,
  vpc_id,
  ssh_key_id,
}: {
  container_name: string;
  vpc_id: string;
  ssh_key_id: string;
}) {
  const session = await auth();
  const userEmail = session?.user?.email as string;
  try {
    const validation = container_create_schema.safeParse({
      container_name: container_name,
      vpc_id: vpc_id,
      ssh_key_id: ssh_key_id,
    });
    if (!validation.success) {
      return {
        success: false,
        message: "Error, Invalid input",
      };
    }
    const vpc = await prisma.vpc.findUnique({
      where: {
        id: vpc_id,
        User: {
          email: userEmail,
        },
      },
    });
    const sshKey = await prisma.ssh_keys.findUnique({
      where: {
        id: ssh_key_id,
      },
    });
    if (!vpc) {
      return {
        success: false,
        message: "Error, VPC not found",
      };
    }
    if (!sshKey) {
      return {
        success: false,
        message: "Error, SSH Key not found",
      };
    }
    const ContainerName = uuid();

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const available_ssh_proxy_port =
      await prisma.available_ssh_proxy_ports.findFirst({
        where: {
          used: false,
        },
      });
    if (!available_ssh_proxy_port) {
      return {
        success: false,
        message: "Error, No available ssh proxy port",
      };
    }

    const create_authorized_key = await axios.post(
      INFRA_BE_URL + "/authorized_keys",
      {
        user_id: user?.id,
        ssh_public_key: sshKey.public_key,
        container_name: ContainerName,
      }
    );

    if (create_authorized_key.data.return_code !== 0) {
      return {
        success: false,
        message: "error, Failed to ssh key",
      };
    }

    const createContainerResponse = await axios.post(
      INFRA_BE_URL + "/container",
      {
        container_name: ContainerName,
        image: "aaraz/caas",
        tag: "1.2",
        network: vpc?.id,
        storage: "3G",
        user_id: user?.id,
      }
    );
    if (createContainerResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "error, Failed to create container",
      };
    }

    const sshTunnelResponse = await axios.post(INFRA_BE_URL + "/sshtunnel", {
      ssh_proxy_port: available_ssh_proxy_port?.ssh_proxy_port,
      container_ip: createContainerResponse.data.container_ip,
      node_name: available_ssh_proxy_port?.ssh_proxy_node_name,
    });

    if (sshTunnelResponse.data.return_code !== 0) {
      return {
        success: false,
        message: "error, Failed to create ssh tunnel",
      };
    }
    try {
      await prisma.available_ssh_proxy_ports.update({
        where: {
          id: available_ssh_proxy_port?.id as string,
        },
        data: {
          used: true,
        },
      });
    } catch (error) {
      console.log(error);
      await axios.delete(INFRA_BE_URL + "/sshtunnel", {
        data: {
          ssh_tunnel_pid: sshTunnelResponse.data.ssh_tunnel_pid,
        },
      });
      return {
        success: false,
        message: "error, database update failed",
      };
    }

    const ssh_config = await prisma.ssh_config.create({
      data: {
        ssh_proxy_node_name: available_ssh_proxy_port.ssh_proxy_node_name,
        ssh_proxy_port: available_ssh_proxy_port.ssh_proxy_port,
        ssh_tunnel_process_id: sshTunnelResponse.data.ssh_tunnel_pid,
        available_ssh_proxy_portsId: available_ssh_proxy_port.id,
        userId: user?.id as string,
      },
    });

    const containerIP = createContainerResponse.data.container_ip;
    await prisma.containers.create({
      data: {
        name: ContainerName,
        nick_name: container_name,
        node: "oracle_arm",
        image: "aaraz/caas",
        tag: "1.2",
        state: $Enums.CONTAINER_STATE.STARTED,
        vpcId: vpc?.id as string,
        ip_address: containerIP,
        userId: user?.id as string,
        ssh_config_id: ssh_config.id,
        ssh_keysId: sshKey.id,
      },
    });
    revalidatePath("/console/containers");
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "failed to create container",
    };
  }
}
