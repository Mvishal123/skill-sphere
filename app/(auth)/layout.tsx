import MaxWidthContainer from "@/components/max-width-container";
import TypeAnimationStudent from "@/components/type-animation-user";
import React from "react";

interface Layout {
  children: React.ReactNode;
}

const layout = ({ children }: Layout) => {
  return (
    <div>
      <div className="w-full h-[100vh] flex">
        <MaxWidthContainer>
          <div className="flex-1 h-full flex items-center justify-center ">
            {children}
          </div>
        </MaxWidthContainer>
        <div className="hidden flex-1 md:flex justify-start items-center bg-[url('/endless-constellation.svg')] object-cover px-12 text-white">
          <TypeAnimationStudent />
        </div>
      </div>
    </div>
  );
};

export default layout;
