import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/utils/uploadthing/uploadthing";

interface FileUploaderProps {
  courseId: string;
  chapterId?: string;
  endPoint: keyof typeof ourFileRouter;
  onChange: (url: string) => void;
}
const FileUploader = ({
  courseId,
  endPoint,
  onChange,
  chapterId,
}: FileUploaderProps) => {
  return (
    <UploadDropzone
      input={
        endPoint === "uploadVideo" ? { chapterId, courseId } : { courseId }
      }
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
      }}
    />
  );
};

export default FileUploader;
