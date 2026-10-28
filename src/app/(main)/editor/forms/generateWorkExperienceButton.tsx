import { Button } from "@/components/ui/button";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  workExperience,
} from "@/src/components/Shared/validation";
import { useToast } from "@/src/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperience } from "./action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { LoadingButton } from "@/src/components/LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: workExperience) => void;
}
const GenerateWorkExperienceButton = ({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) => {
  const [showInputDialog, setShowInputDialog] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
      >
        <WandSparklesIcon className="size-4" />
        Smart fill(AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workeExperience) => {
          onWorkExperienceGenerated(workeExperience);
          setShowInputDialog(false);
        }}
      />
    </>
  );
};
export default GenerateWorkExperienceButton;

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: workExperience) => void;
}
function InputDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: InputDialogProps) {
  const { toast } = useToast();
  const form = useForm<GenerateWorkExperienceInput>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateWorkExperienceInput) {
    try {
      const response = await generateWorkExperience(input);
      onWorkExperienceGenerated(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong.Please try again",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Work Experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "from nov 2019 to dec 2020 i worked at google as a software engineer,task were:"`}
                      autoFocus
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
