import {
  generateSummarySchema,
  GgenerateSummaryInput,
} from "@/src/components/Shared/validation";

export async function generateSummary(input: GgenerateSummaryInput) {
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `You are a job resume generator AI. Your task is to write a professional introduction summary depending on user's provided data.Only eturn the summary and do not include any other information in the response.Keep it concise and professionl`;
}
