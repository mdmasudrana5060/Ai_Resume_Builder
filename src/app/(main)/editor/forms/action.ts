"use server";

import geminiAi from "@/lib/geminiAi";
import {
  generateSummarySchema,
  GgenerateSummaryInput,
} from "@/src/components/Shared/validation";

export async function generateSummary(
  input: GgenerateSummaryInput,
): Promise<string> {
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage =
    "You are a job resume generator AI. Your task is to write a professional introduction summary depending on user's provided data. Only return the summary and do not include any other information in the response. Keep it concise and professional.";

  const userMessage = `Please generate a professional resume summary from this data:
Job title: ${jobTitle || "N/A"}

Work experience:
${
  workExperiences
    ?.map(
      (exp) =>
        `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
Description: ${exp.description || "N/A"}`,
    )
    .join("\n\n") || "N/A"
}

Education:
${
  educations
    ?.map(
      (edu) =>
        `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`,
    )
    .join("\n\n") || "N/A"
}

  Skills:
      ${skills}`;

  const maxRetries = 3;
  let delay = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await geminiAi.models.generateContent({
        model: "gemini-3.8-flash",
        contents: userMessage,
        config: {
          systemInstruction: systemMessage,
          temperature: 0.3,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });

      if (!response.text) {
        throw new Error("No summary content generated.");
      }

      return response.text;
    } catch (error: any) {
      const is503 = error?.status === 503 || error?.message?.includes("503");

      if (is503 && attempt < maxRetries) {
        console.warn(
          `Gemini 503 High Demand. Retrying attempt ${attempt}/${maxRetries} in ${delay}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }

      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate summary");
    }
  }

  // Guaranteed fallback throw to satisfy TypeScript return check (ts2366)
  throw new Error("Failed to generate summary after maximum retries");
}
