import dynamic from "next/dynamic";

const TerminalComponent = dynamic(() => import("./terminal/terminal"), {
  ssr: false,
});

function Home() {
  return (
    <div className="m-5">
      <TerminalComponent />;
    </div>
  );
}

export default Home;
