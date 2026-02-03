import { cn } from "@/lib/utils";
import { ResumeValues } from "./Shared/validation";
import { useEffect, useMemo, useRef } from "react";
import useDimensions from "../hooks/useDimensions";
import Image from "next/image";
import { formatDate, isValid } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

const ResumePreview = ({
  resumeData,

  className,
}: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-210/297",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
      </div>
    </div>
  );
};
export default ResumePreview;

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email } =
    resumeData;

  const photoSrc = useMemo(() => {
    if (photo instanceof File) {
      return URL.createObjectURL(photo);
    }
    return photo || "";
  }, [photo]);

  useEffect(() => {
    return () => {
      if (photo instanceof File && photoSrc) {
        URL.revokeObjectURL(photoSrc);
      }
    };
  }, [photo, photoSrc]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={120}
          height={120}
          alt="Author photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-1">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
          <p className="font-medium capitalize">{jobTitle}</p>
        </div>

        <div className="text-sm text-gray-500 space-y-0.5">
          {email && <p>{email}</p>}
          {phone && <p>{phone}</p>}
          {[city, country].filter(Boolean).length > 0 && (
            <p>{[city, country].filter(Boolean).join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;
  if (!summary) return null;
  return (
    <>
      <hr className="border-2" />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold ">Professional Profile</p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;
  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );
  if (!workExperiencesNotEmpty?.length) return null;
  return (
    <>
      <hr className="border-2" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Work Experience</p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "dd/MM/yyyy")}-{" "}
                  {exp.endDate && isValid(new Date(exp.endDate))
                    ? formatDate(exp.endDate, "dd/MM/yyyy")
                    : "Present"}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-sm ">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
