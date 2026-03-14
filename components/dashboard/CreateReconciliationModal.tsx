"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReconciliationForm } from "@/components/forms/ReconciliationForm";
import type { CreateReconciliationFormValues } from "@/components/forms/reconciliation-form-schema";
import type { CreateReconciliationInput } from "@/types/reconciliation";

interface CreateReconciliationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateReconciliationInput) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function CreateReconciliationModal({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateReconciliationModalProps) {
  function handleSubmit(values: CreateReconciliationFormValues) {
    onSubmit({
      accountName: values.accountName,
      bankName: values.bankName,
      statementDate: values.statementDate,
      description: values.description ?? "",
      file: values.file,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showClose={true}>
        <DialogHeader>
          <DialogTitle>Enviar extrato</DialogTitle>
        </DialogHeader>
        <ReconciliationForm
          key={open ? "open" : "closed"}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
