import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Ubah ZodError menjadi map sederhana { field: pesan } (stabil lintas versi Zod).
 */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0]?.toString() ?? "form";
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
