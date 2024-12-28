"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { container_create_schema } from "@/lib/zod";
import { Loader2 } from "lucide-react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { createContainer } from "@/app/actions/infra";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_VPC_NAME } from "@/lib/vars";

export function CreateContainer({
  vpcs,
}: {
  vpcs: { id: string; vpc_name: string }[];
}) {
  const router = useRouter();
  type ContainerCreationSchema = z.infer<typeof container_create_schema>;
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    control,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm<ContainerCreationSchema>({
    resolver: zodResolver(container_create_schema),
    mode: "onChange",
    defaultValues: {
      vpc_id: vpcs.filter((item) => item.vpc_name === DEFAULT_VPC_NAME)[0].id,
    },
  });

  const UserVPCs = vpcs;
  const defaultVPCID = UserVPCs.filter(
    (item) => item.vpc_name === DEFAULT_VPC_NAME
  )[0].id;

  const onSubmit: SubmitHandler<ContainerCreationSchema> = async (FormData) => {
    const res = await createContainer({
      container_name: FormData.container_name,
      vpc_id: FormData.vpc_id,
    });
    if (res.success) {
      toast.success("Container created successfully");
      reset();
      router.refresh();
    } else {
      console.log(res.message);
      toast.error("Failed to create container, Try again");
      alert("Failed to create container, Try again");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Add Container</Button>
      </DialogTrigger>
      <DialogContent className="w-full md:w-fit">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Container</DialogTitle>
            <DialogDescription>
              Enter Details required or create a new container
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:gap-4 gap-2 md:py-4 py-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="md:text-base text-sm">
                Container Name <span className="text-red-600">*</span>
              </Label>
              <div className="col-span-3 space-y-2">
                <Input {...register("container_name")} />
                {errors.container_name && (
                  <div className="text-sm text-red-600">
                    {errors.container_name.message}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vpc" className="text-nowrap md:text-base text-sm">
                VPC
              </Label>
              <Controller
                control={control}
                name="vpc_id"
                render={() => (
                  <Select
                    onValueChange={(e) => {
                      setValue("vpc_id", e);
                      clearErrors("vpc_id");
                    }}
                    defaultValue={defaultVPCID}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select VPC" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup id="vpc">
                        {UserVPCs.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.vpc_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            {isSubmitting ? (
              <Button disabled size={"lg"} className="w-full text-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
                <div>Hold on</div>
              </Button>
            ) : (
              <Button
                disabled={!isValid}
                size={"lg"}
                className="w-full text-lg"
                type="submit"
              >
                Create
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
