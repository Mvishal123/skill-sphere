import Landing from "@/components/landing/landing";
import { getServerAuthSession } from "@/utils/data/getServerAuthSession";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();

  return <div className="">
    <Landing />
  </div>;
};

export default page;
