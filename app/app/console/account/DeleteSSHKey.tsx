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
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
function DeleteSSHKey() {
  const [loading, setLoading] = useState(false);
  async function Deletesshkey() {
    setLoading(true);
    // call api to delete ssh key
    setLoading(false);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="hover:text-red-600 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you Sure ?</DialogTitle>
          <DialogDescription>
            Once delete cannot be revocered !!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {loading ? (
            <Button disabled variant={"destructive"}>
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button variant={"destructive"} onClick={Deletesshkey}>
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteSSHKey;
