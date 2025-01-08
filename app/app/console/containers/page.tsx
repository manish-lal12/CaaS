import { CreateContainer } from "./CreateContainer"
import { auth } from "@/auth"
import prisma from "@/lib/db"
import ContainerTable from "./ContainerTable"
async function ContainersPage() {
  const session = await auth()
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    },
    include: {
      UserData: {
        select: {
          id: true,
          vpc: {
            select: {
              id: true,
              vpc_name: true
            }
          },
          ssh_keys: {
            select: {
              id: true,
              nick_name: true
            }
          }
        }
      }
    }
  })

  const user_vpc = await prisma.vpc.findMany({
    where: {
      UserDataId: user?.UserData?.id
    },
    select: {
      id: true,
      vpc_name: true
    }
  })

  return (
    <div
      style={{ height: "calc(100vh - 65px)" }}
      className="lg:overflow-auto md:p-6 p-2 space-y-4"
    >
      <div className="text-2xl font-bold flex justify-between items-center">
        <div>Containers</div>
        <div>
          <CreateContainer
            vpcs={user?.UserData?.vpc}
            ssh_keys={user?.UserData?.ssh_keys}
          />
        </div>
      </div>
      <div className="md:p-6 p-2 space-y-4 border-2 rounded-xl">
        <ContainerTable vpcs={user_vpc} />
      </div>
    </div>
  )
}

export default ContainersPage
