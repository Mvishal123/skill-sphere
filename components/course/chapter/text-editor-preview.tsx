"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";

interface EditorPreviewProps {
  initialValue: string;
}

const EditorPreview = ({ initialValue }: EditorPreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="bg-white rounded-md">
      <ReactQuill theme="bubble" value={initialValue} readOnly />
    </div>
  );
};

export default EditorPreview;
