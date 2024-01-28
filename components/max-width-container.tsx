import React from "react";

const MaxWidthContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-12 md:px-18 lg:px-24">{children}</div>;
};

export default MaxWidthContainer;
