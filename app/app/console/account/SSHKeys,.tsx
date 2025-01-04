import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import CreateNewSSHKeys from "./CreateNewSSHKEY"
import { UseOwnSSHKeys } from "./ImportSSHKeys"
function AddSSHKeys() {
  return (
    <Sheet>
      <SheetTrigger className="text-base" asChild>
        <Button size={"sm"}>
          <Plus />
          <div>Add Keys</div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw]">
        <SheetHeader>
          <SheetTitle>SSH Key</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="create" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="create">Create New</TabsTrigger>
            <TabsTrigger value="use_own">import</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <CreateNewSSHKeys />
          </TabsContent>
          <TabsContent value="use_own">
            <UseOwnSSHKeys />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

export default AddSSHKeys
