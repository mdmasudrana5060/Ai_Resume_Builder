import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

const Footer = ({ currentStep, setCurrentStep }: FooterProps) => {
  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="secondary">Previous Step</Button>
          <Button> Next Step</Button>
        </div>
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
