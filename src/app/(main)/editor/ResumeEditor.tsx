"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValues } from "@/src/components/Shared/validation";
import ResumePreviewSection from "./resumePreviewSection";
import { cn } from "@/lib/utils";

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<ResumeValues>({});
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const searchParms = useSearchParams();
  const currentStep = searchParms.get("step") || steps[0].key;
  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParms);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };
  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex  min-h-screen flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume.You progress will be save
          here automatically.
        </p>
      </header>
      <main className="relative flex-1 overflow-y-auto">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full md:block md:w-1/2 p-3 space-y-6",
              showSmResumePreview && "hidden",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="hidden  md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
      />
    </div>
  );
};
export default ResumeEditor;
