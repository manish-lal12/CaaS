"use client";
import { editVPC } from "@/app/actions/infra";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { edit_vpc_schema } from "@/lib/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

function EditVpc({ VpcName, vpc_id }: { VpcName: string; vpc_id: string }) {
  const router = useRouter();
  type EditVPCSchema = z.infer<typeof edit_vpc_schema>;
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EditVPCSchema>({
    resolver: zodResolver(edit_vpc_schema),
    mode: "onChange",
    defaultValues: {
      id: vpc_id,
    },
  });

  const onSubmit: SubmitHandler<EditVPCSchema> = async (formData) => {
    const res = await editVPC({
      vpc_name: formData.name,
      vpc_id: formData.id,
    });
    if (res.success) {
      reset();
      toast.success("VPC updated successfully");
      router.refresh();
    } else {
      setError("root", {
        message: res.message,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="hover:text-blue-500 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="md:w-fit">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl">New Name of VPC</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <Label>Name: </Label>
              <Input {...register("name")} />
            </div>
            {errors.name && (
              <div className="text-red-600 text-right">
                {errors.name.message}
              </div>
            )}
            {errors.root && (
              <div className="text-red-600 text-right">
                {errors.root.message}
              </div>
            )}
          </div>
          <DialogFooter>
            {isSubmitting ? (
              <Button disabled size={"lg"} className="w-1/2 text-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
                <div>Hold on</div>
              </Button>
            ) : (
              <Button
                disabled={!isValid}
                className="w-1/2 text-lg"
                type="submit"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditVpc;
