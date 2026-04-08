import { cn } from "@/lib/utils";
import { ResumeValues } from "./Shared/validation";
import { useEffect, useMemo, useRef } from "react";
import useDimensions from "../hooks/useDimensions";
import Image from "next/image";
import { formatDate, isValid } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { BorderStyles } from "../app/(main)/editor/BorderStyleButton";

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
        <EducationSection resumeData={resumeData} />
        <SkillSection resumeData={resumeData} />
      </div>
    </div>
  );
};
export default ResumePreview;

interface ResumeSectionProps {
  resumeData: ResumeValues;
}
function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

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
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-1">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium capitalize"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
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
  const { summary, colorHex } = resumeData;
  if (!summary) return null;
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold " style={{ color: colorHex }}>
          Professional Profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;
  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );
  if (!workExperiencesNotEmpty?.length) return null;
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Work Experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
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
function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  const educationNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );
  if (!educationNotEmpty?.length) return null;
  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Education
        </p>
        {educationNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{ color: colorHex }}
            >
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {formatDate(edu.startDate, "MM/yyyy")}
                  {edu.endDate && ` - ${formatDate(edu.endDate, "MM/yyyy")}`}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}
function SkillSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;
  return (
    <>
      <hr className="border-2" style={{ borderColor: colorHex }} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color: colorHex }}>
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="bg-black hover:bg-black text-white rounded-md"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
