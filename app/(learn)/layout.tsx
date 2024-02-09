import Navbar from "@/components/learn/navbar";
import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <div>
    <Navbar />
    {children}</div>;
};

export default layout;
