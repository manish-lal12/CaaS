"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { DEFAULT_VPC_NAME } from "@/lib/vars";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import ContainerStatusBadge from "@/components/ContainerStatusBadge";
function ContainerTable({
  vpcs,
}: {
  vpcs:
    | {
        vpc_name: string;
        id: string;
      }[]
    | undefined;
}) {
  const [vpc, setVpc] = useState(() => {
    return vpcs?.filter((vpc) => vpc.vpc_name === DEFAULT_VPC_NAME)[0]?.id;
  });
  const [vpcFetchLoading, setVpcFetchLoading] = useState(false);
  const [container, setContainer] = useState<
    {
      container_name: string;
      container_nick_name: string;
      container_ip: string;
      node: string;
      created_at: string;
    }[]
  >([]);
  const DefaultVPCID = vpcs?.filter(
    (vpc) => vpc.vpc_name === DEFAULT_VPC_NAME
  )[0]?.id;
  useEffect(() => {
    async function getContainers() {
      setVpcFetchLoading(true);
      if (vpc) {
        const res = await axios.get(`/api/v1/app/containers?vpc_id=${vpc}`);
        const data = res.data;
        setContainer(data);
      }
      setVpcFetchLoading(false);
    }
    getContainers().then(() => {
      console.log("Containers fetched");
    });
  }, [vpc]);
  return (
    <>
      <div className="flex gap-2 items-center">
        <div>VPC</div>
        <Select
          defaultValue={DefaultVPCID}
          onValueChange={(e) => {
            setVpc(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Vpc" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {vpcs?.map((vpc) => (
                <SelectItem key={vpc.id} value={vpc.id}>
                  {vpc.vpc_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {vpcFetchLoading && <Loader2 className="w-6 h-6 animate-spin" />}
      </div>
      <div className="max-h-[600px] overflow-auto max-w-[90vw]">
        <Table>
          <TableHeader className="dark:bg-zinc-800 bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Node</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Internal IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {container.map((detail) => {
              return (
                <>
                  <TableRow>
                    <TableCell className="font-medium  text-blue-600 underline underline-offset-2 hover:text-blue-700">
                      <Link
                        href={`containers/${detail.container_name}`}
                        className="cursor-pointer"
                      >
                        {detail.container_nick_name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <ContainerStatusBadge
                        container_name={detail.container_name}
                      />
                    </TableCell>
                    <TableCell>{detail.node}</TableCell>
                    <TableCell>
                      {new Date(detail.created_at).toUTCString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {detail.container_ip}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ContainerTable;
