"use client";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { trpc } from "@/app/_trpc/trpc-client";
import qs from "query-string";

import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";
import { Input } from "../ui/input";

const Sidebar = () => {
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
    <div className="lg:fixed pt-16 lg:w-[20%] hidden lg:block h-[calc(100vh-4rem)]">
      <div className="p-3 border-r">
        <div className="flex items-center gap-2 pl-3">
          <Compass />
          <h1 className="text-xl font-bold"> Explore</h1>
        </div>
        <div className="mt-4 pl-3">
          <Input placeholder="Search..." />
        </div>
        <div className="h-[900px] overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-700">
          <ul className="space-y-2">
            {categories?.map((category) => (
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
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
