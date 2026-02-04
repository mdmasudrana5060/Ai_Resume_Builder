import ResumePreview from "@/src/components/ResumePreview";
import { ResumeValues } from "@/src/components/Shared/validation";
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}
const ResumePreviewSection = ({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return (
    <div className="relative hidden w-1/2 md:flex">
      <div className="absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
};
export default ResumePreviewSection;
