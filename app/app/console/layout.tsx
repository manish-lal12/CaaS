import SideBar from "@/components/SideBar";
import NavBar from "@/components/ui/NavBar";

function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export default ConsoleLayout;
