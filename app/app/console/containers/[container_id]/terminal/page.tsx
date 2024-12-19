import TermComp from "@/app/terminal/terminal";
import { Separator } from "@/components/ui/separator";

function Terminal() {
  return (
    <div>
      <div className="overflow-hidden rounded-sm ">
        <TermComp />
      </div>
      <div className="text-xl p-2 space-y-4 ">
        <Separator />
        <div>VPC - 11.0.0.0/24</div>
        <Separator />
        <div>Container Nick Name - andromeda</div>
        <Separator />
        <div>Internal IP - 11.0.0.5</div>
        <Separator />
      </div>
    </div>
  );
}

export default Terminal;
