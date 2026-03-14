"use client";

import { useReconciliations, useDeleteReconciliation } from "@/lib/api/reconciliation";
import { UploadStatementButton } from "@/components/dashboard/UploadStatementButton";
import { ReconciliationTable } from "@/components/dashboard/ReconciliationTable";

export default function ReconciliationPage() {
  const { data: reconciliations = [], isLoading } = useReconciliations();
  const deleteMutation = useDeleteReconciliation();

  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Conciliação bancária</h1>
            <p className="text-muted-foreground text-sm">
              Gerencie os extratos bancários enviados para conciliação.
            </p>
          </div>
          <UploadStatementButton />
        </div>

        <div className="rounded-md border border-border">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Carregando...
            </div>
          ) : (
            <ReconciliationTable
              data={reconciliations}
              onDelete={handleDelete}
              isDeletingId={deleteMutation.isPending ? deleteMutation.variables : null}
            />
          )}
        </div>
      </div>
    </div>
  );
}
