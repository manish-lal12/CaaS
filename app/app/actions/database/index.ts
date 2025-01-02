"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { INFRA_BE_URL } from "@/lib/vars";
import axios from "axios";
import SshPK from "sshpk";

export async function CreateAndSaveSSHKey({ key_name }: { key_name: string }) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  const { data } = await axios.get(INFRA_BE_URL + "/gensshkey");
  try {
    await prisma.ssh_keys.create({
      data: {
        nick_name: key_name,
        public_key: data.public_key,
        private_key: data.private_key,
        userId: user?.id as string,
      },
    });
    return {
      success: true,
      message: "",
      private_key: data.private_key,
      public_key: data.public_key,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to save SSH key",
      private_key: "",
      public_key: "",
    };
  }
}

export async function SaveSSHKey({
  key_name,
  private_key,
}: {
  key_name: string;
  private_key: string;
}) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  const public_key = SshPK.parsePrivateKey(private_key)
    .toPublic()
    .toString("ssh");
  try {
    await prisma.ssh_keys.create({
      data: {
        nick_name: key_name,
        public_key: public_key,
        private_key: private_key,
        userId: user?.id as string,
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
      message: "Failed to save SSH key",
    };
  }
}

export async function deleteSSHKey({ id }: { id: string }) {
  try {
    await prisma.ssh_keys.delete({
      where: {
        id: id,
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
      message: "Failed to delete SSH key",
    };
  }
}
