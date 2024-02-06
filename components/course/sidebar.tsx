"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { trpc } from "@/app/_trpc/trpc-client";
import qs from "query-string";

import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";

const Sidebar = () => {
  //   const [isMounted, setIsMounted] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categorySearch = searchParams.get("category");

  const { data: categories } = trpc.course.getCategories.useQuery();

  const onClick = (category: string) => {
    const isSelected = category === categorySearch;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: isSelected ? null : category,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };
  return (
    <div className="h-full">
      {/* Open and close button */}
      {/* {isOpen && (
        <div className="animate-in slide-in-from-right-5 z-0 h-full inset-0 fade-in-20">
          <div className="h-full w-60 border-r overflow-y-auto">
            <div
              className="absolute right-0 translate-x-5 top-3 bg-slate-100 hover:bg-slate-200 pr-2 py-2  cursor-pointer group"
              style={{ borderRadius: "0 100px 100px 0" }}
              onClick={toggleOpen}
            >
              <X className="h-3 w-3 text-slate-200 group-hover:text-slate-800 " />
            </div>
            hey
          </div>
        </div>
      )}
      {!isOpen && (
        <div className="w-[10px] group h-full">
          <div
            onClick={toggleOpen}
            className="bg-slate-200 translate-y-5 pr-1.5 py-1 rounded-r-full cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 text-slate-200 group-hover:text-slate-800" />
          </div>
        </div>
      )} */}

      {/* Contents */}
      <div className="h-full w-60 border-r overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 pl-2">
            <Compass />
            <h1 className="text-xl font-bold"> Explore</h1>
          </div>
          <ul className="space-y-2 mt-4">
            {categories?.map((category) => {
              return (
                <li
                  key={category.id}
                  className={cn(
                    "w-full py-2 px-3 rounded-md cursor-pointer",
                    categorySearch === category.category && "bg-slate-100"
                  )}
                  onClick={() => onClick(category.category)}
                >
                  {category.category}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
