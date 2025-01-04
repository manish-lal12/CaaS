import { Trash2, Edit } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"

import AddVpc from "./AddVpc"
import EditVpc from "./EditVpc"
import VPCDeleteButton from "./action"
import { auth } from "@/auth"
import prisma from "@/lib/db"

async function VpcPage() {
  const session = await auth()
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    },
    include: {
      vpc: {
        select: {
          id: true,
          vpc_name: true,
          cidr: true,
          gateway: true
        }
      }
    }
  })

  let vpcs = user?.vpc || []
  vpcs = vpcs.filter((vpc) => vpc.vpc_name !== "Default")
  const defaultVPC = user?.vpc.find((vpc) => vpc.vpc_name === "Default")
  return (
    <div className="m-2 md:m-6 space-y-2 md:space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">VPCs</div>
        <AddVpc />
      </div>
      <div className="border-2 rounded-xl md:p-6 p-2 max-w-[95vw] overflow-auto">
        <Table className="">
          <TableHeader className="dark:bg-zinc-800 bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>CIDR</TableHead>
              <TableHead>Gateway</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Default</TableCell>
              <TableCell>{defaultVPC?.cidr}</TableCell>
              <TableCell>{defaultVPC?.gateway}</TableCell>
              <TableCell className="text-right flex gap-4 justify-end">
                <Trash2 className="text-red-500/20 " />
                <Edit className="dark:text-white/20 text-black/20" />
              </TableCell>
            </TableRow>
            {vpcs.map((vpc) => (
              <TableRow key={vpc.cidr}>
                <TableCell className="font-medium">{vpc.vpc_name}</TableCell>
                <TableCell>{vpc.cidr}</TableCell>
                <TableCell>{vpc.gateway}</TableCell>
                <TableCell className="text-right flex gap-4 justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash2 className="text-red-500 hover:text-red-600 cursor-pointer" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will delete VPC {"' " + vpc.vpc_name + " '"}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex flex-row justify-center gap-2 items-baseline">
                        <VPCDeleteButton vpc_id={vpc.id} />
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <EditVpc vpc_id={vpc.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default VpcPage
