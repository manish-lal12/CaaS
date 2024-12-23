import { Separator } from "@/components/ui/separator";
import { CreateContainer } from "./CreateContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
function ContainersPage() {
  const containers = [
    {
      nick_name: "Polar hunter",
      status: "running",
      node: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
      internal_ip: "11.0.0.1",
    },
  ];
  return (
    <div
      style={{ height: "calc(100vh - 65px)" }}
      className="overflow-auto p-6 space-y-4"
    >
      <div className="text-2xl font-bold flex items-center justify-between">
        <div>Containers</div>
        <div>
          <CreateContainer />
        </div>
      </div>
      <div className="p-6 space-y-4 border-2 rounded-xl">
        <div className="flex gap-2 items-center">
          <div>VPC</div>
          <Select defaultValue="default">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="dev">Dev</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Node</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Internal IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {containers.map((detail) => (
                <TableRow key={detail.nick_name}>
                  <TableCell className="font-medium">
                    {detail.nick_name}
                  </TableCell>
                  <TableCell>
                    <Badge variant={"running"}>running</Badge>
                  </TableCell>
                  <TableCell>{detail.node}</TableCell>
                  <TableCell>{detail.createdAt}</TableCell>
                  <TableCell className="text-right">
                    {detail.internal_ip}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ContainersPage;
