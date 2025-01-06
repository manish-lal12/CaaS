import { auth } from "@/auth"
import prisma from "@/lib/db"
import { NextRequest } from "next/server"
export const fetchCache = "force-no-store"

export async function GET(request: NextRequest) {
  const sesssion = await auth()
  if (!sesssion) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  const searchParams = request.nextUrl.searchParams
  const vpc_id = searchParams.get("vpc_id")
  const containers = await prisma.containers.findMany({
    where: {
      User: {
        email: sesssion?.user?.email as string
      },
      vpc: {
        id: vpc_id as string
      }
    },
    include: {
      ssh_config: {
        select: {
          ssh_proxy_port: true
        }
      }
    }
  })
  return Response.json(
    containers.map((container) => {
      return {
        container_name: container.name,
        container_nick_name: container.nick_name,
        container_ip: container.ip_address,
        node: container.node,
        created_at: container.createdAt,
        ssh_port: container.ssh_config.ssh_proxy_port
      }
    })
  )
}
