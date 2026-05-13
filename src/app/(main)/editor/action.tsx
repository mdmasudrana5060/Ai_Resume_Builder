"use server";

import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/src/components/Shared/validation";
import { auth } from "@clerk/nextjs/server";

export async function saveResume(values: ResumeValues) {
  const { id } = values;
  const { photo, workExperiences, educations, ...reusmeValues } =
    resumeSchema.parse(values);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }
}
