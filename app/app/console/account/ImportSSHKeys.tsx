"use client";
import { SaveSSHKey } from "@/app/actions/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SshPK from "sshpk";

export function UseOwnSSHKeys() {
  const [keyName, setKeyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState<
    string | ArrayBuffer | null | undefined
  >("");
  const [error, setError] = useState("");
  const route = useRouter();
  async function SubmitSSHKey() {
    setLoading(true);
    const res = await SaveSSHKey({
      key_name: keyName,
      private_key: fileContent as string,
    });
    if (!res.success) {
      setError("Could not save key, Try Again");
    } else {
      setError("");
      setFileContent("");
      setKeyName("");
      alert("Key Saved");
      route.refresh();
    }
    setLoading(false);
  }
  return (
    <form>
      <div className="grid w-full max-w-sm items-center gap-1.5 p-4 space-y-2">
        <div className="space-y-2">
          <Label htmlFor="ssh_key" className="text-lg font-bold">
            SSH Private Key File <span className="text-red-600">*</span>
          </Label>
          <Input
            id="ssh_key"
            type="file"
            onChange={(e) => {
              const fileReader = new FileReader();
              const { files } = e.target;
              if (files) {
                fileReader.readAsText(files[0], "UTF-8");
                fileReader.onload = (e) => {
                  const content = e.target?.result;
                  try {
                    const key = SshPK.parseKey(content as string);
                    console.log(key.type);
                    setFileContent(content);
                  } catch (e) {
                    console.log(e);
                    alert("Could not parse key");
                  }
                };
              } else {
                alert("Invalid File");
              }
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="key_name" className="text-lg font-bold">
            Key Name{" "}
            <span className="text-red-600">
              * <sub> (min 3)</sub>
            </span>
          </Label>
          <Input
            id="key_name"
            type="text"
            value={keyName}
            onChange={(e) => {
              setKeyName(e.target.value);
            }}
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}

        {loading ? (
          <Button size={"sm"} disabled>
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button
            size={"sm"}
            disabled={!fileContent || keyName.length < 3}
            type="submit"
            onClick={SubmitSSHKey}
          >
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}
