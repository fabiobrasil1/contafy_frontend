"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateReconciliationModal } from "./CreateReconciliationModal";
import { useCreateReconciliation } from "@/lib/api/reconciliation";
import type { CreateReconciliationInput } from "@/types/reconciliation";

export function UploadStatementButton() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateReconciliation();

  async function handleSubmit(input: CreateReconciliationInput) {
    await createMutation.mutateAsync(input);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        Enviar extrato
      </Button>
      <CreateReconciliationModal
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
      />
    </>
  );
}
