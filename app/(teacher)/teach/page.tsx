import MaxWidthContainer from "@/components/max-width-container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="">
      <MaxWidthContainer>
        <div className="w-full pt-24">
          <div className="relative w-full flex justify-center">
            <Image
              src="/teacherlanding.jpg"
              height={1000}
              width={500}
              alt="teacher-image"
            />
          </div>
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Elevate your <span className="text-purply">teaching</span>{" "}
                impact with our innovative online platform designed to empower
                educators and inspire students.
              </h1>
            </div>
            <div className="mt-6  mx-auto">
              <Link href="/teach/create">
                <button className="px-8 py-2  border-2 border-black dark:border-white uppercase bg-white text-neutarl-700 transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                  Start now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default page;
