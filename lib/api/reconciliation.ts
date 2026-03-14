"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReconciliations,
  createReconciliation,
  deleteReconciliation,
} from "@/lib/mocks/reconciliation.mock";
import type { CreateReconciliationInput } from "@/types/reconciliation";
import { queryKeys } from "./query-keys";

export function useReconciliations() {
  return useQuery({
    queryKey: queryKeys.reconciliation.list(),
    queryFn: getReconciliations,
  });
}

export function useCreateReconciliation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateReconciliationInput) =>
      createReconciliation(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reconciliation.all });
    },
  });
}

export function useDeleteReconciliation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReconciliation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reconciliation.all });
    },
  });
}
