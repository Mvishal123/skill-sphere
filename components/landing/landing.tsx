"use client";
import { Boxes } from "../ui/background-boxes";

const Landing = () => {
  return (
    <div className="h-[60vh] relative w-full overflow-hidden bg-slate-50 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-50 z-20 [mask-image:radial-gradient(transparent,black)] pointer-events-none" />
      <div className="z-50 line">
        <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold text-center drop-shadow-lg">
          Don&apos;t just browse the web
        </h1>
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          <span className="font-protest">Learn</span> to design it
        </h2>
      </div>

      <Boxes />
    </div>
  );
};

export default Landing;
