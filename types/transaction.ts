export type TransactionStatus = "completed" | "pending" | "cancelled";
export type TransactionType = "credit" | "debit" | "transfer";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  accountName: string;
  type: TransactionType;
  status: TransactionStatus;
  category?: string;
  createdAt: string;
}

export interface TransactionFilters {
  search?: string;
  accountName?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}

export interface TransactionsResponse {
  data: Transaction[];
  total: number;
  page: number;
  pageSize: number;
}
