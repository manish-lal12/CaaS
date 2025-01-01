"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { LogInIcon, LogOutIcon } from "lucide-react";

export function LoginButton() {
  return (
    <Button
      onClick={() => {
        signIn(undefined, { callbackUrl: "/user/wallet" });
      }}
      className="text-lg"
    >
      Login <LogInIcon />
    </Button>
  );
}

export function LogoutButton() {
  return (
    <Button
      onClick={() => {
        signOut({
          callbackUrl: "/",
        });
      }}
      variant={"destructive"}
      size={"sm"}
    >
      Logout <LogOutIcon className="h-4" />
    </Button>
  );
}
