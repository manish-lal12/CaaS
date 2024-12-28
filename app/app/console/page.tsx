import { auth } from "@/auth";
import { ConsoleOptions, ConsoleContainers } from "./ConsoleHomeComponents";
import prisma from "@/lib/db";

async function ConsolePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      vpc: {
        select: {
          vpc_name: true,
          id: true,
        },
      },
    },
  });

  return (
    <>
      <div className="2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg md:space-y-6 space-y-2 md:m-auto mx-2">
        <div className="text-2xl md:text-4xl font-bold md:mt-4 mt-2">
          Console Home
        </div>
        <div className="md:grid grid-cols-2 gap-4">
          <ConsoleOptions />
          <ConsoleContainers vpcs={user?.vpc} />
        </div>
      </div>
    </>
  );
}

export default ConsolePage;
