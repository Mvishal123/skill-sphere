"use client";

import { useRouter } from "next/navigation";

const StartTeachingButton = () => {
    const router = useRouter();
    
  return (
    <button className="p-[3px] relative" onClick={() => router.push("/teach") }>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
      <div className="px-8 py-[1px]  bg-white rounded-full  relative group transition duration-200 text-black hover:bg-transparent hover:text-white hover:font-bold">
        Start teaching
      </div>
    </button>
  );
};

export default StartTeachingButton;
