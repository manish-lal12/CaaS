import SideBar from "@/components/SideBar"
import NavBar from "@/components/ui/NavBar"
import WelcomeCheckPipe from "../pipes/WelcomeCheckPipe"

function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WelcomeCheckPipe>
        <NavBar />
        <div className="flex">
          <SideBar />
          <div className="flex-1">{children}</div>
        </div>
      </WelcomeCheckPipe>
    </>
  )
}

export default ConsoleLayout
