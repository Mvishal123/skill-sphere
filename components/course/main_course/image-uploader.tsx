import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/utils/uploadthing/uploadthing";

interface UploadDropZoneProps {
  courseId: string;
  endPoint: keyof typeof ourFileRouter;
  onChange: (url: string) => void;
}
const UploadDropZone = ({
  courseId,
  endPoint,
  onChange,
}: UploadDropZoneProps) => {
  return (
    <UploadDropzone
      input={{
        courseId,
      }}
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error) => {
        console.log("[UPLOADTHING COURSE]:", error);
      }}
    />
  );
};

export default UploadDropZone;
