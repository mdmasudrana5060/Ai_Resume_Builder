import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});
export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const personalInfoSchema = z.object({
  firstName: optionalString,
  lastName: optionalString,
  phone: optionalString,
  email: optionalString,
  jobTitle: optionalString,
  country: optionalString,
  city: optionalString,

  photo: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, PNG, or WEBP images are allowed",
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Image must be less than 3MB",
    }),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
