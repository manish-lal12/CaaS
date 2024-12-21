"use client";
import {
  ArrowLeftRightIcon,
  CircleUserRoundIcon,
  CreditCard,
  WalletIcon,
  Cog,
  PackagePlus,
  Network,
  Box,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion@sidebar";
import { usePathname } from "next/navigation";

function SideBar() {
  const path = usePathname().slice(1).split("/");
  if (path[0] === "console" && path.length === 1) {
    return <></>;
  }

  return (
    <div
      className="p-2 border-r-2 border-neutral-200 rounded-xl w-48 xl:w-60 hidden lg:block space-y-2"
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      <Link
        href="/console/profile"
        className={`flex items-center p-2 rounded-lg ${
          path.includes("profile")
            ? "bg-gray-100 text-amber-500"
            : "text-grey-900"
        } hover:bg-gray-100 group`}
      >
        <CircleUserRoundIcon />
        <span className="flex-1 ms-3 whitespace-nowrap text-gray-900">
          Account
        </span>
      </Link>
      <Link
        href="/console/containers"
        className={`flex items-center p-2 rounded-lg ${
          path.includes("containers")
            ? "bg-gray-100 text-amber-500"
            : "text-grey-900"
        } hover:bg-gray-100 group`}
      >
        <Box />
        <span className="flex-1 ms-3 whitespace-nowrap text-gray-900">
          Containers
        </span>
      </Link>
      <Link
        href="/console/vpc"
        className={`flex items-center p-2 rounded-lg ${
          path.includes("vpc") ? "bg-gray-100 text-amber-500" : "text-grey-900"
        } hover:bg-gray-100 group`}
      >
        <Network />
        <span className="flex-1 ms-3 whitespace-nowrap text-gray-900">VPC</span>
      </Link>
      {/* <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ">
            <div className="flex">
              <CreditCard />
              <span className="ms-3 whitespace-nowrap">Payment</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-6 ">
            <Link
              href="/user/payment/setup"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
            >
              <Cog className="group-hover:opacity-100 opacity-50" />
              <span className="flex-1 ms-3 whitespace-nowrap">Setup</span>
            </Link>
            <Link
              href="/user/payment/create"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
            >
              <PackagePlus className="group-hover:opacity-100 opacity-50" />
              <span className="flex-1 ms-3 whitespace-nowrap">Create</span>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
    </div>
  );
}

export default SideBar;
