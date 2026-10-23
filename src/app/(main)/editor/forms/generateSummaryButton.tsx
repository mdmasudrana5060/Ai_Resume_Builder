import { LoadingButton } from "@/src/components/LoadingButton";
import { ResumeValues } from "@/src/components/Shared/validation";
import { useToast } from "@/src/hooks/use-toast";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./action";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}
const GenerateSummaryButton = ({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  async function handleClick() {
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparklesIcon className="size-4"></WandSparklesIcon>
      Generate Summary
    </LoadingButton>
  );
};
export default GenerateSummaryButton;
