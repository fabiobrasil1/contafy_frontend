"use client";

import type { Transaction } from "@/types/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const statusLabels: Record<Transaction["status"], string> = {
  completed: "Concluída",
  pending: "Pendente",
  cancelled: "Cancelada",
};

const statusVariant: Record<Transaction["status"], "success" | "warning" | "destructive"> = {
  completed: "success",
  pending: "warning",
  cancelled: "destructive",
};

const typeLabels: Record<Transaction["type"], string> = {
  credit: "Crédito",
  debit: "Débito",
  transfer: "Transferência",
};

interface TransactionTableProps {
  data: Transaction[];
}

export function TransactionTable({ data }: TransactionTableProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-md border border-border py-12 text-center text-muted-foreground">
        Nenhuma transação encontrada. Ajuste os filtros para ver mais resultados.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Conta</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="text-muted-foreground whitespace-nowrap">
              {formatDate(row.date)}
            </TableCell>
            <TableCell>
              <div className="font-medium">{row.description}</div>
              {row.category && (
                <div className="text-xs text-muted-foreground">{row.category}</div>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {row.accountName}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {typeLabels[row.type]}
            </TableCell>
            <TableCell
              className={`text-right font-medium ${
                row.amount >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatCurrency(row.amount)}
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[row.status]}>
                {statusLabels[row.status]}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
