/**
 * Centralized TanStack Query keys for Contafy.
 * Add keys as you create new features (reconciliation, transactions, etc.)
 */

export const queryKeys = {
  reconciliation: {
    all: ["reconciliation"] as const,
    list: () => [...queryKeys.reconciliation.all, "list"] as const,
    detail: (id: string) => [...queryKeys.reconciliation.all, "detail", id] as const,
  },
  transactions: {
    all: ["transactions"] as const,
    list: (filters?: unknown) => [...queryKeys.transactions.all, "list", filters] as const,
    detail: (id: string) => [...queryKeys.transactions.all, "detail", id] as const,
  },
} as const;
