import Navbar from "@/components/teacher/teacher-navbar";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default layout;
