import { z } from "zod";

export const availability = ["WEEKENDS", "EVENINGS", "WEEKDAYS"] as const;

export const userConfigurationSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  availability: z.array(z.enum(availability), {
    error: "Check atleast 1 option",
  }),
  skillsOffered: z.array(
    z.object({
      value: z.string().min(1, "Skill cannot be empty"),
    })
  ),
});

export type UserConfigurationForm = z.infer<typeof userConfigurationSchema>;
