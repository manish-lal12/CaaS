"use client";
import { AppWindow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ContainerCard({
  state,
  container_id,
}: {
  state: "on" | "off";
  container_id: string;
}) {
  return (
    <Link
      href={`containers/${container_id}`}
      className="h-72 shadow-lg hover:bg-neutral-50 p-6 space-y-6"
    >
      <div className="text-2xl shadow-sm p-2">Amber foster</div>
      <div className="flex gap-6">
        <div className="text-lg space-y-4 w-20">
          <div className="flex items-center justify-center gap-2 hover:bg-amber-400 rounded-md p-1 hover:cursor-pointer">
            <AppWindow />
            <div>ssh</div>
          </div>
        </div>
        <div className="flex-1 ">
          <Image
            src={`https://static.aaraz.me/caas/container_${state}.png`}
            alt=""
            height={200}
            width={200}
            className="m-auto"
          />
        </div>
      </div>
    </Link>
  );
}

export default ContainerCard;
