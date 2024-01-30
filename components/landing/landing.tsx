"use client";
import { Boxes } from "../ui/background-boxes";

const Landing = () => {
  return (
    <div className="h-[60vh] relative w-full overflow-hidden bg-slate-100 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-100 z-20 [mask-image:radial-gradient(transparent,black)] pointer-events-none" />
      <div className="z-50 ">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center">
          Don&apos;t just browse the web
        </h1>
        <h2 className="text-center text-2xl md:text-4xl font-bold">
          Learn to design it
        </h2>
      </div>

      <Boxes />
    </div>
  );
};

export default Landing;
