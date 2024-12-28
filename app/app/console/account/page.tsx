import { TriangleAlert } from "lucide-react";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { LogoutButton } from "@/components/LoginLogoutButton";

async function Profile() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  return (
    <div className="md:m-6 m-2 md:space-y-4 space-y-2">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Account</div>
        <LogoutButton />
      </div>
      <div className="md:p-6 p-3 rounded-xl border-2 space-y-4 flex flex-col">
        <div className="md:grid md:space-x-10 grid-cols-2 flex flex-col md:gap-4 gap-2">
          <div>
            <div className="font-bold">Account ID</div>
            <div>{user?.id}</div>
          </div>
          <div>
            <div className="font-bold">Account Name</div>
            <div>{user?.name}</div>
          </div>
        </div>
        <div className="md:grid md:space-x-10 grid-cols-2 flex flex-col gap-4">
          <div>
            <div className="font-bold">Email</div>
            <div>{user?.email}</div>
          </div>
          <div>
            <div className="font-bold">User Name</div>
            <div>{user?.username}</div>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold">Billing</div>
      <div className="md:p-6 p-3 rounded-xl border-2 space-y-4 flex flex-col">
        <div className="md:grid md:space-x-10 grid-cols-2 flex flex-col md:gap-4 gap-2">
          <div>
            <div className="font-bold">Billing ID</div>
            <div>{user?.id}</div>
          </div>
          <div>
            <div className="font-bold">Month</div>
            <div>2024-Jul</div>
          </div>
        </div>
        <div className="md:grid md:space-x-10 grid-cols-2 flex flex-col gap-4">
          <div>
            <div className="font-bold">Cost</div>
            <div>$00.00</div>
          </div>
          <div>
            <div className="font-bold">Plan</div>
            <div>Free</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 border-2 rounded-lg p-4 text-sm text-yellow-400">
        <TriangleAlert className="h-8 w-8" />
        <div>
          <p className="text-lg">Warning! </p>
          <p>Container performance on the free plan may fluctuate.</p>
          <p>Upgrade to Premium for reliable and consistent performance!</p>
        </div>
      </div>
      {/* <div className="bg-red-600 hover:bg-red-500 cursor-pointer py-1 px-4 rounded-full w-fit text-white text-lg text-center ">
        Delete Account
      </div> */}
    </div>
  );
}

export default Profile;
