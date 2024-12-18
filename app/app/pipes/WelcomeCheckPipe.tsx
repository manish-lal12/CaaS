import { auth } from "@/auth";
import prisma from "@/lib/db";
import { permanentRedirect } from "next/navigation";

async function WelcomeCheckPipe({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (!user?.welcomed) {
    permanentRedirect("/welcome");
  }
  return <>{children}</>;
}

export default WelcomeCheckPipe;
