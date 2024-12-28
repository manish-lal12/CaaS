import { TriangleAlert } from "lucide-react";
import { CpuUsesChart } from "./charts/CpuUses";
import { MemoryUsesChart } from "./charts/MemoryUses";
import ContainerDetailTabs from "./tabs";
function ContainerDetail({
  params,
}: {
  params: {
    container_id: string;
  };
}) {
  return (
    <div
      style={{
        height: "calc(100vh - 65px)",
        overflow: "auto",
      }}
      className="p-4 space-y-6"
    >
      <div className="rounded-lg md:flex md:flex-row gap-4 flex flex-col">
        <MemoryUsesChart />
        <CpuUsesChart />
      </div>
      <div className="flex items-center gap-6 border-2 rounded-lg max-h-fit p-4 text-sm text-sky-400">
        <TriangleAlert className="h-8 w-8" />
        <div>
          <p className="text-lg md:text-2xl font-bold">Info! </p>
          <p className="md:text-lg">
            The ram uses is slightly inaccurate due to the limitations of docker
            API.
          </p>
          <p className="">
            The graph shows uses during 30s. Do not assume the uses based on the
            graph height, hover to see actual value.
          </p>
        </div>
      </div>
      <div>
        <ContainerDetailTabs container_name={params.container_id} />
      </div>
    </div>
  );
}

export default ContainerDetail;
