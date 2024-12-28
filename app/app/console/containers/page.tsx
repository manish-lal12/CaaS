import { CreateContainer } from "./CreateContainer";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import ContainerTable from "./ContainerTable";
async function ContainersPage() {
  const session = await auth();
  const user_vpc = await prisma.vpc.findMany({
    where: {
      User: {
        email: session?.user?.email as string,
      },
    },
    select: {
      id: true,
      vpc_name: true,
    },
  });

  return (
    <div
      style={{ height: "calc(100vh - 65px)" }}
      className="lg:overflow-auto md:p-6 p-2 space-y-4"
    >
      <div className="text-2xl font-bold flex justify-between items-center">
        <div>Containers</div>
        <div>
          <CreateContainer vpcs={user_vpc} />
        </div>
      </div>
      <div className="md:p-6 p-2 space-y-4 border-2 rounded-xl">
        <ContainerTable vpcs={user_vpc} />
      </div>
    </div>
  );
}

export default ContainersPage;
