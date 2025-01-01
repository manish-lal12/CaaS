"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function CreateNewSSHKeys() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  async function CreateSSHKeys() {
    setLoading(true);
    // function
    setLoading(false);
  }
  return (
    <div>
      <form className="space-y-4 md:p-4">
        <div className="space-y-2">
          <Label htmlFor="sshkeyname" className="text-lg font-bold">
            Key Name
          </Label>
          <Input
            id="sshkeyname"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {error && <div className="text-red-500">{error}</div>}
        </div>
        {loading ? (
          <Button disabled size={"sm"}>
            <Loader2 />{" "}
          </Button>
        ) : (
          <Button
            size={"sm"}
            disabled={name.length < 3 ? true : false}
            onClick={CreateSSHKeys}
          >
            Create
          </Button>
        )}
      </form>
    </div>
  );
}

export default CreateNewSSHKeys;
