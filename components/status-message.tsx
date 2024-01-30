import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface MessageProps {
  label?: string;
}
export const SuccessMessage = ({ label }: MessageProps) => {
  return (
    <div className="w-full bg-emerald-200 text-emerald-900 py-1.5 px-12 rounded-sm flex justify-center gap-3">
      <CheckCircle2 />
      {label}
    </div>
  );
};
export const ErrorMessage = ({ label }: MessageProps) => {
  return (
    <div className="w-full bg-red-200 text-red-800 py-1.5 px-12 rounded-sm flex justify-center gap-3">
      <AlertTriangle />
      {label}
    </div>
  );
};
