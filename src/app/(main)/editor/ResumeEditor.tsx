import { Button } from "@/components/ui/button";
import Link from "next/link";

const ResumeEditor = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design Your Resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume.You progress will be save
          here automatically.
        </p>
      </header>
      <main className="relative flex-1 overflow-y-auto">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full md:w-1/2">left</div>
          <div className="hidden md:block md:border-r" />
          <div className="hidden w-1/2 md:flex">right</div>
        </div>
      </main>
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
    </div>
  );
};
export default ResumeEditor;
