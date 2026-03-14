export interface DashboardSummary {
  totalBalance: number;
  pendingReconciliations: number;
  transactionCount: number;
  lastUpdated: string;
}

export interface BalancePoint {
  date: string;
  balance: number;
  label: string;
}
