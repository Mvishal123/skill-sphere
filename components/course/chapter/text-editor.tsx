"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }), // to dynamically import only when this is reached
    []
  );
  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
