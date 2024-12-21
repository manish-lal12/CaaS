import { ConsoleOptions, ConsoleContainers } from "./ConsoleHomeComponents";

function ConsolePage() {
  return (
    <>
      <div className="max-w-screen-2xl space-y-6 m-auto">
        <div className="text-4xl font-bold mt-4">Console Home</div>
        <div className="grid grid-cols-2 gap-4 h-[700px]">
          <ConsoleOptions />
          <ConsoleContainers />
        </div>
      </div>
    </>
  );
}

export default ConsolePage;
