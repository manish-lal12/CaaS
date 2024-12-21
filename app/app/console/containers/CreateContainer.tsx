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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function CreateContainer() {
  const [loading, setLoading] = useState(false);
  const [containerName, setContainerName] = useState("");
  async function HandleSubmit() {
    setLoading(true);
    // submit code
    setLoading(false);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="bg-amber-400 rounded-full">
          Add Container
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create Container</DialogTitle>
          <DialogDescription>
            Enter Details required or create a new container
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Container Name <span className="text-red-600">*</span>
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={containerName}
              onChange={(e) => {
                setContainerName(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          {loading ? (
            <Button disabled size={"lg"} className="w-1/2 text-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
              <div>Hold on</div>
            </Button>
          ) : (
            <Button
              disabled={containerName.length < 3}
              size={"lg"}
              className="w-1/2 text-lg"
              onClick={HandleSubmit}
            >
              Create
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
