import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(150),
  password: z.string().min(8).max(200),
});
