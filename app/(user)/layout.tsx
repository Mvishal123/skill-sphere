import Navbar from "@/components/navbar/navbar";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative">
      <div className=" z-10 w-full">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default layout;
