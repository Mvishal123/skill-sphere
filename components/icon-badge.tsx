import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  icon: LucideIcon;
  status?: boolean;
}

const IconBadge = ({ icon: Icon, status = false }: IconProps) => {
  return (
    <div
      className={cn(
        " inline-block p-2 rounded-full",
        !status ? "bg-purple-400/75" : "bg-green-300/75"
      )}
    >
      <Icon className={!status ? "text-purple-900" : "text-green-900"} />
    </div>
  );
};

export default IconBadge;
