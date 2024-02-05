"use client";

import { currencyConverter } from "@/lib/currency-converter";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export type Courses = {
  id: string;
  title: string;
  cost: number | null;
  category: string | null;
  isPublished: boolean;
};

export const columns: ColumnDef<Courses>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <h1 className="">Title</h1>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="truncate font-semibold">{row.getValue("title")}</p>;
    },
  },
  {
    accessorKey: "cost",
    header: "Price",
    cell: ({ row }) => {
      return (
        <div className="italic">
          {row.getValue("cost") ? currencyConverter(row.getValue("cost")) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="italic">
          {row.getValue("category") ? row.getValue("category") : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const rowValue = row.getValue("isPublished");

      return (
        <div>
          {rowValue === true && <Badge variant={"success"}>published</Badge>}
          {rowValue == false && (
            <Badge variant={"secondary"}>Not published</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const courseId = row.getValue("id");
      return (
        <Link href={`/teach/create/${courseId}`}>
          <SquarePen className="h-4 w-4" />
        </Link>
      );
    },
  },
];
