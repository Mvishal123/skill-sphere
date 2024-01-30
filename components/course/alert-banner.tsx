import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2Icon } from "lucide-react";
import React from "react";

interface AlertBannerProps {
  label: string;
  type: "success" | "warning";
}

const AlertBanner = ({ label, type }: AlertBannerProps) => {
  return (
    <div
      className={cn("w-full  py-2 border ", {
        "bg-yellow-100 border-yellow-500 text-yellow-800": type === "warning",
        "bg-emerald-200 border-emerald-500 text-green-700": type === "success",
      })}
    >
      <div className="flex justify-center items-center">
        {type === "success" ? <CheckCircle2Icon /> : <AlertTriangle />}
        <p className="ml-3">{label}</p>
      </div>
    </div>
  );
};

export default AlertBanner;
