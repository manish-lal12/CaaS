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
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ContainerStatusBadge from "@/components/ContainerStatusBadge";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { DEFAULT_VPC_NAME } from "@/lib/vars";

export function ConsoleOptions() {
  return (
    <div className="rounded-xl border-2 mb-4 lg:m-0">
      <div className="text-xl lg:text-2xl font-bold p-2 border-b-2">
        Services
      </div>
      <div className="p-4 text-md md:text-xl space-y-4">
        <Link href={"/console/account"} className="flex gap-4 items-center">
          <Image
            src={"https://static.aaraz.me/caas/profile_logo.png"}
            alt=""
            height={100}
            width={100}
            className="h-8 w-8"
          />
          <div className="text-blue-700 hover:text-blue-900 hover:underline underline-offset-2 cursor-pointer">
            Account
          </div>
        </Link>
        <Separator />
        <Link href={"/console/containers"} className="flex gap-4 items-center">
          <Image
            src={"https://static.aaraz.me/caas/container_logo.svg"}
            alt=""
            height={100}
            width={100}
            className="h-7 w-7"
          />
          <div className="text-blue-700 hover:text-blue-900 hover:underline underline-offset-2 cursor-pointer">
            My Containers
          </div>
        </Link>
        <Separator />
        <Link href={"/console/vpc"} className="flex gap-4 items-center">
          <Image
            src={"https://static.aaraz.me/caas/vpc_logo.svg"}
            alt=""
            height={100}
            width={100}
            className="h-8 w-8"
          />
          <div className="text-blue-700 hover:text-blue-900 hover:underline underline-offset-2 cursor-pointer">
            My VPCs
          </div>
        </Link>
        <Separator />
        {/* <Link href={"/console/metrics"} className="flex gap-4 items-center">
          <Image
            src={"https://static.aaraz.me/caas/metrics_logo.png"}
            alt=""
            height={100}
            width={100}
            className="h-8 w-8"
          />
          <div className="text-blue-700 hover:text-blue-900 hover:underline underline-offset-2 cursor-pointer">
            Metrics
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export function ConsoleContainers({
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
    }[]
  >([]);
  const DefaultVPCID = vpcs?.filter(
    (vpc) => vpc.vpc_name === DEFAULT_VPC_NAME
  )[0]?.id;
  useEffect(() => {
    async function getContainers() {
      setVpcFetchLoading(true);
      if (vpc) {
        const res = await fetch(`/api/v1/app/containers?vpc_id=${vpc}`);
        const data = await res.json();
        setContainer(data);
      }
      setVpcFetchLoading(false);
    }
    getContainers();
  }, [vpc]);
  return (
    <div className="rounded-xl border-2">
      <div className="text-xl border-b-2 ">
        <div className="text-xl md:text-2xl font-bold p-2">Container</div>
        <div className="p-2 flex gap-2 items-center pb-4">
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
      </div>
      <div className="md:h-[600px] max-h-[300px] md:max-h-[600px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="">Container IP</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {container.map((container) => (
              <TableRow key={container.container_name}>
                <TableCell className="font-medium">
                  {container.container_nick_name}
                </TableCell>
                <TableCell className="">{container.container_ip}</TableCell>
                <TableCell className="flex justify-end text-right">
                  <ContainerStatusBadge
                    container_name={container.container_name}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center border-t-2">
        <Link
          href={"/console/containers"}
          className="p-4 text-blue-600 hover:underline-offset-2 text-lg hover:underline"
        >
          Go to my Containers
        </Link>
      </div>
    </div>
  );
}
