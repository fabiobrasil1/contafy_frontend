import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
