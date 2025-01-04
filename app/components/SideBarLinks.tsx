"use client"

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion@sidebar";
import { CircleUserRoundIcon, Box, Network } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function SideBarLinks() {
  const path = usePathname().slice(1).split("/")
  return (
    <>
      <Link
        href="/console/account"
        className={`flex items-center p-2 rounded-lg ${
          path.includes("account")
            ? "bg-gray-100 dark:bg-zinc-900 text-amber-500"
            : "text-grey-900"
        } hover:bg-gray-100 dark:hover:bg-zinc-900 group`}
      >
        <CircleUserRoundIcon />
        <span className="flex-1 ms-3 whitespace-nowrap text-gray-900 dark:text-white">
          Account
        </span>
      </Link>
      <Link
        href="/console/containers"
        className={`flex items-center p-2 rounded-lg ${
          path.includes("containers")
            ? "bg-gray-100 dark:bg-zinc-900 text-amber-500"
            : "text-grey-900"
        } hover:bg-gray-100 dark:hover:bg-zinc-900 group`}
      >
        <Box />
        <span className="flex-1 ms-3 whitespace-nowrap text-gray-900 dark:text-white">
          Containers
        </span>
      </Link>
      <Link
        href="/console/vpc"
        className={`flex items-center p-2 rounded-lg ${
          path.includes("vpc")
            ? "bg-gray-100 text-amber-500 dark:bg-zinc-900"
            : "text-grey-900"
        } hover:bg-gray-100 dark:hover:bg-zinc-900 group`}
      >
        <Network />
        <span className="flex-1 ms-3 whitespace-nowrap text-gray-900 dark:text-white">
          VPC
        </span>
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
    </>
  )
}

export default SideBarLinks
