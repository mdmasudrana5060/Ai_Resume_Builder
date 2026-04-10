import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
}

const Footer = ({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
}: FooterProps) => {
  const currentIndex = steps.findIndex((step) => step.key === currentStep);
  const previousStep = steps[currentIndex - 1]?.key;
  const nextStep = steps[currentIndex + 1]?.key;
  return (
    <footer className="w-full border-t px-3 py-5 mt-2">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous Step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next Step
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resume">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
