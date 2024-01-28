import MaxWidthContainer from "@/components/max-width-container";
import TypeAnimationStudent from "@/components/type-animation-user";
import React from "react";

interface Layout {
  children: React.ReactNode;
}

const layout = ({ children }: Layout) => {
  return (
    <MaxWidthContainer>
      <div className="w-full h-[calc(100vh-4rem)] flex">
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
        <div className="flex-1 flex justify-start items-center">
          <TypeAnimationStudent />
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default layout;
