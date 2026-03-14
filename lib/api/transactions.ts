"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions, getTransactionById } from "@/lib/mocks/transactions.mock";
import type { TransactionFilters } from "@/types/transaction";
import { queryKeys } from "./query-keys";

export function useTransactions(filters?: TransactionFilters) {
  return useQuery({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: () => getTransactions(filters),
  });
}

export function useTransaction(id: string | null) {
  return useQuery({
    queryKey: queryKeys.transactions.detail(id ?? ""),
    queryFn: () => getTransactionById(id!),
    enabled: !!id,
  });
}
