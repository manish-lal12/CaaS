import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Trash2, Terminal } from "lucide-react";
import Link from "next/link";

function ContainerDetailTabs() {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="network_rules">Network Rules</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="w-full space-y-2">
        <div className="bg-neutral-50 space-y-2 rounded-md p-2">
          <div className="text-2xl font-bold">Actions</div>
          <div className="flex gap-14 p-2 items-center">
            <div className="flex gap-2 cursor-pointer group ">
              <span>Start</span>
              <Play className="group-hover:text-green-600" />
            </div>
            <div className="flex gap-2 cursor-pointer group">
              <span>Stop</span>
              <Pause className="group-hover:text-amber-600" />
            </div>
            <div className="flex gap-2 group cursor-pointer">
              <span>Restart</span>
              <RotateCcw className="group-hover:text-fuchsia-700" />
            </div>
            <div className="flex gap-2 group p-1 rounded-md cursor-pointer">
              <span>Delete</span>
              <Trash2 className="group-hover:text-red-500" />
            </div>
            <Link href={""} className="flex gap-2 group cursor-pointer">
              <span>Terminal</span>
              <Terminal className="group-hover:text-blue-500" />
            </Link>
          </div>
        </div>
        <div className="bg-neutral-50 rounded-md p-2">
          <div className="text-2xl font-bold">Details</div>
          <div className="p-3 text-lg text-gray-600">
            Id - jskdfhsd-f7s89df7uref-bydsiufs7d8-9fsf8
          </div>
          <Separator />
          <div className="p-3 text-lg text-gray-600">
            Name - daldia macleren
          </div>
          <Separator />
          <div className="p-3 text-lg text-gray-600">
            Host Node - oracle_arm
          </div>
          <Separator />
          <div className="p-3 text-lg text-gray-600">
            Image - aaraz/caas:1.1
          </div>
          <Separator />
          <div className="p-3 text-lg text-gray-600">
            Internal IP - 11.0.0.1
          </div>
          <Separator />
          <div className="p-3 text-lg text-gray-600">
            Created - 2027-20-55 12:02:12
          </div>
        </div>
      </TabsContent>
      <TabsContent value="network_rules">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
}

export default ContainerDetailTabs;
