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
  dashboard: {
    all: ["dashboard"] as const,
    summary: () => [...queryKeys.dashboard.all, "summary"] as const,
    recentTransactions: () => [...queryKeys.dashboard.all, "recentTransactions"] as const,
    balanceOverTime: () => [...queryKeys.dashboard.all, "balanceOverTime"] as const,
  },
  settings: {
    all: ["settings"] as const,
    profile: () => [...queryKeys.settings.all, "profile"] as const,
    preferences: () => [...queryKeys.settings.all, "preferences"] as const,
  },
} as const;
