import { z } from "zod";

const currencyOptions = ["BRL", "USD", "EUR"] as const;
const dateFormatOptions = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"] as const;

export const preferencesFormSchema = z.object({
  currency: z.enum(currencyOptions, {
    required_error: "Selecione a moeda",
  }),
  dateFormat: z.enum(dateFormatOptions, {
    required_error: "Selecione o formato de data",
  }),
});

export type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

export { currencyOptions, dateFormatOptions };
