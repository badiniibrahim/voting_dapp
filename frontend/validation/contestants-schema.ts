import { z } from "zod"

export const ContestantsSchema = z.object({
  name: z
    .string({
      invalid_type_error: "The name must be a valid string.",
      required_error: "The name is required.",
    })
    .min(3, "The title must be between 3 and 20 characters.")
    .max(20000, "The title must be between 3 and 20 characters."),

  image: z
    .string()
    .min(3, "The image must be between 3 and 20 characters.")
    .max(2000, "The image must be between 3 and 2000 characters."),
})

export type ProfileType = z.infer<typeof ContestantsSchema>
