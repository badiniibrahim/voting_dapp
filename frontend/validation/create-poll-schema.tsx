import { z } from "zod"

export const CreatePollSchema = z.object({
  title: z
    .string({
      invalid_type_error: "The title must be a valid string.",
      required_error: "The title is required.",
    })
    .min(3, "The title must be between 3 and 20 characters.")
    .max(20000, "The title must be between 3 and 20 characters."),

  image: z
    .string()
    .min(3, "The image must be between 3 and 20 characters.")
    .max(2000, "The image must be between 3 and 2000 characters."),

  description: z
    .string({
      invalid_type_error: "The description must be a valid string.",
      required_error: "The description is required.",
    })
    .min(3, "The description must be between 3 and 20 characters.")
    .max(200000, "The description must be between 3 and 20 characters."),

  startsAt: z.coerce.date({
    invalid_type_error: "The start date must be a valid date.",
    required_error: "The start date is required.",
  }),

  endsAt: z.coerce.date({
    invalid_type_error: "The end date must be a valid date.",
    required_error: "The end date is required.",
  }),
})

export type ProfileType = z.infer<typeof CreatePollSchema>
