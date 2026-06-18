import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(3000),
  company: z.string().max(150).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
});
