"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  preferencesFormSchema,
  type PreferencesFormValues,
  currencyOptions,
  dateFormatOptions,
} from "./preferences-form-schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CURRENCY_LABELS: Record<string, string> = {
  BRL: "Real (BRL)",
  USD: "Dólar (USD)",
  EUR: "Euro (EUR)",
};

const DATE_FORMAT_LABELS: Record<string, string> = {
  "dd/MM/yyyy": "DD/MM/AAAA",
  "MM/dd/yyyy": "MM/DD/AAAA",
  "yyyy-MM-dd": "AAAA-MM-DD",
};

interface PreferencesFormProps {
  defaultValues?: Partial<PreferencesFormValues>;
  onSubmit: (values: PreferencesFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function PreferencesForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: PreferencesFormProps) {
  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      currency: defaultValues?.currency ?? "BRL",
      dateFormat: defaultValues?.dateFormat ?? "dd/MM/yyyy",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="currency">Moeda</Label>
        <Select
          onValueChange={(value) => form.setValue("currency", value as PreferencesFormValues["currency"])}
          value={form.watch("currency")}
        >
          <SelectTrigger id="currency">
            <SelectValue placeholder="Selecione a moeda" />
          </SelectTrigger>
          <SelectContent>
            {currencyOptions.map((code) => (
              <SelectItem key={code} value={code}>
                {CURRENCY_LABELS[code] ?? code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.currency && (
          <p className="text-sm text-destructive">
            {form.formState.errors.currency.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="dateFormat">Formato de data</Label>
        <Select
          onValueChange={(value) => form.setValue("dateFormat", value as PreferencesFormValues["dateFormat"])}
          value={form.watch("dateFormat")}
        >
          <SelectTrigger id="dateFormat">
            <SelectValue placeholder="Selecione o formato" />
          </SelectTrigger>
          <SelectContent>
            {dateFormatOptions.map((format) => (
              <SelectItem key={format} value={format}>
                {DATE_FORMAT_LABELS[format] ?? format}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.dateFormat && (
          <p className="text-sm text-destructive">
            {form.formState.errors.dateFormat.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar preferências"}
        </Button>
      </div>
    </form>
  );
}
