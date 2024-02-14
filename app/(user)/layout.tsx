import Navbar from "@/components/navbar/navbar";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <div className="fixed z-10 w-full">
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
