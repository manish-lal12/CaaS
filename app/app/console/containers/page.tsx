import { Button } from "@/components/ui/button";
import ContainerCard from "./ContainerCard";
function ContainersPage() {
  return (
    <>
      <div
        style={{ height: "calc(100vh - 64px)" }}
        className="overflow-auto p-10 space-y-6"
      >
        <div className="text-4xl flex justify-between">
          <div>Containers</div>
          <div>
            <Button>Create Container</Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 ">
          <ContainerCard state={"on"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
          <ContainerCard state={"off"} container_id="sdsd" />
        </div>
      </div>
    </>
  );
}

export default ContainersPage;
