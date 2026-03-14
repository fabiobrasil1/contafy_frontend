import { z } from "zod";

const ALLOWED_EXTENSIONS = ["pdf", "csv", "ofx"] as const;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Validação de arquivo sem usar FileList/File no top-level (SSR-safe)
const fileSchema = z
  .unknown()
  .refine(
    (val) => val != null && typeof val === "object" && "length" in val && (val as { length: number }).length > 0,
    "Selecione um arquivo"
  )
  .refine(
    (val) => {
      const first = (val as { 0?: { size?: number } })?.[0];
      return first && (first.size ?? 0) <= MAX_FILE_SIZE;
    },
    "Arquivo deve ter no máximo 10MB"
  )
  .refine(
    (val) => {
      const first = (val as { 0?: { name?: string } })?.[0];
      const ext = first?.name?.split(".").pop()?.toLowerCase();
      return ext ? ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number]) : false;
    },
    "Formatos permitidos: PDF, CSV, OFX"
  )
  .transform((val) => (val as { 0: File })[0]);

export const createReconciliationFormSchema = z.object({
  accountName: z.string().min(1, "Nome da conta é obrigatório"),
  bankName: z.string().min(1, "Nome do banco é obrigatório"),
  statementDate: z.string().min(1, "Data do extrato é obrigatória"),
  description: z.string().optional(),
  file: fileSchema,
});

export type CreateReconciliationFormValues = z.infer<
  typeof createReconciliationFormSchema
>;
