"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import SshPK from "sshpk";
export function UseOwnSSHKeys() {
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState<
    string | ArrayBuffer | null | undefined
  >("");
  const [error, setError] = useState("");

  async function SubmitSSHKey() {
    setLoading(true);
    //
    setLoading(false);
  }
  return (
    <form>
      <div className="grid w-full max-w-sm items-center gap-1.5 p-4 space-y-2">
        <div className="space-y-2">
          <Label htmlFor="picture" className="text-lg font-bold">
            SSH Private Key File
          </Label>
          <Input
            id="picture"
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
          {error && <div className="text-red-600">{error}</div>}
        </div>
        {error && <div className="text-red-500">{error}</div>}

        {loading ? (
          <Button size={"sm"} disabled>
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button
            size={"sm"}
            disabled={!fileContent}
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
