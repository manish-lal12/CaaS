"use client"
import { usePathname } from "next/navigation"
import SideBarLinks from "./SideBarLinks"

function SideBar() {
  const path = usePathname().slice(1).split("/")
  if (path[0] === "console" && path.length === 1) {
    return <></>
  }

  return (
    <div
      className="p-2 border-r-2 border-neutral-200 dark:border-zinc-900 w-48 xl:w-60 hidden md:block space-y-2"
      style={{
        height: "calc(100vh - 65px)"
      }}
    >
      <SideBarLinks />
    </div>
  )
}

export default SideBar
