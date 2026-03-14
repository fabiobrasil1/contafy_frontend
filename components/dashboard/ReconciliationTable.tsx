"use client";

import type { Reconciliation } from "@/types/reconciliation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

interface ReconciliationTableProps {
  data: Reconciliation[];
  onDelete?: (id: string) => void;
  isDeletingId?: string | null;
}

export function ReconciliationTable({
  data,
  onDelete,
  isDeletingId = null,
}: ReconciliationTableProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-md border border-border py-8 text-center text-muted-foreground">
        Nenhum extrato enviado. Clique em &quot;Enviar extrato&quot; para começar.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Conta</TableHead>
          <TableHead>Banco</TableHead>
          <TableHead>Data do extrato</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Arquivo</TableHead>
          {onDelete && <TableHead className="w-[80px]"></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.accountName}</TableCell>
            <TableCell>{row.bankName}</TableCell>
            <TableCell>{formatDate(row.statementDate)}</TableCell>
            <TableCell className="max-w-[200px] truncate text-muted-foreground">
              {row.description || "—"}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {row.fileName} <span className="text-xs">({row.fileType.toUpperCase()})</span>
            </TableCell>
            {onDelete && (
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => onDelete(row.id)}
                  disabled={isDeletingId === row.id}
                  aria-label="Excluir"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
