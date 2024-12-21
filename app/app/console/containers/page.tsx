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
  const invoices = [
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
    },
    {
      invoice: "Polar hunter",
      paymentStatus: "Paid",
      totalAmount: "11.0.0.1",
      paymentMethod: "oracle_arm",
      createdAt: "2021-10-10 12:45:00",
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
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>
                    <Badge variant={"running"}>running</Badge>
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell>{invoice.createdAt}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
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
