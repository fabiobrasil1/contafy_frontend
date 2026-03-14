"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createReconciliationFormSchema,
  type CreateReconciliationFormValues,
} from "./reconciliation-form-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BANK_OPTIONS = [
  "Banco do Brasil",
  "Itaú",
  "Bradesco",
  "Santander",
  "Caixa",
  "Outro",
];

interface ReconciliationFormProps {
  onSubmit: (values: CreateReconciliationFormValues) => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export function ReconciliationForm({
  onSubmit,
  isSubmitting = false,
  onCancel,
}: ReconciliationFormProps) {
  const form = useForm<CreateReconciliationFormValues>({
    resolver: zodResolver(createReconciliationFormSchema),
    defaultValues: {
      accountName: "",
      bankName: "",
      statementDate: "",
      description: "",
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="accountName">Nome da conta</Label>
        <Input
          id="accountName"
          placeholder="Ex: Conta Corrente Principal"
          {...form.register("accountName")}
        />
        {form.formState.errors.accountName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.accountName.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="bankName">Banco</Label>
        <Select
          onValueChange={(value) => form.setValue("bankName", value)}
          value={form.watch("bankName")}
        >
          <SelectTrigger id="bankName">
            <SelectValue placeholder="Selecione o banco" />
          </SelectTrigger>
          <SelectContent>
            {BANK_OPTIONS.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.bankName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.bankName.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="statementDate">Data do extrato</Label>
        <Input
          id="statementDate"
          type="date"
          {...form.register("statementDate")}
        />
        {form.formState.errors.statementDate && (
          <p className="text-sm text-destructive">
            {form.formState.errors.statementDate.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Input
          id="description"
          placeholder="Ex: Extrato janeiro/2024"
          {...form.register("description")}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="file">Arquivo do extrato (PDF, CSV ou OFX)</Label>
        <Input
          id="file"
          type="file"
          accept=".pdf,.csv,.ofx"
          {...form.register("file")}
        />
        {form.formState.errors.file && (
          <p className="text-sm text-destructive">
            {form.formState.errors.file.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar extrato"}
        </Button>
      </div>
    </form>
  );
}
