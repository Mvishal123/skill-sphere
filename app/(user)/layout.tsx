import Navbar from "@/components/navbar/navbar";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="sticky top-0">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default layout;
