"use client";
import { Boxes } from "../ui/background-boxes";

const Landing = () => {
  return (
    <div className="h-[60vh] relative w-full overflow-hidden bg-slate-50 flex flex-col items-center justify-center z-20">
      <div className="absolute inset-0 w-full h-full bg-slate-50 z-20 [mask-image:radial-gradient(transparent,black)] pointer-events-none" />
      <div className="z-20 line relative">
        <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold text-center drop-shadow-lg">
          Don&apos;t just browse the web
        </h1>
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg relative ">
          <span className="text-purply ">Learn</span> to design it
          <div className="z-50 after:content-[''] after:w-[4rem] after:h-[50px] after:blur-xl after:absolute after:left-[25%] after:top-[30%] after:rotate-45 after:bg-gradient-to-r after:bg-purply/30" />

        </h2>
      </div>

      <Boxes />
    </div>
  );
};

export default Landing;
