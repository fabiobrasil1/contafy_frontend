import type { DashboardSummary, BalancePoint } from "@/types/dashboard";
import type { Transaction } from "@/types/transaction";

function mockDelay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

export function getDashboardSummary(): Promise<DashboardSummary> {
  return mockDelay({
    totalBalance: 45820.6,
    pendingReconciliations: 2,
    transactionCount: 156,
    lastUpdated: new Date().toISOString(),
  });
}

// Reusa a lista do transactions.mock via import estático; aqui simulamos só os últimos 5
const recentTransactionsMock: Transaction[] = [
  {
    id: "1",
    date: "2024-03-10",
    description: "Pagamento fornecedor ABC",
    amount: -1500.0,
    accountName: "Conta Corrente Principal",
    type: "debit",
    status: "completed",
    category: "Fornecedores",
    createdAt: "2024-03-10T14:30:00Z",
  },
  {
    id: "2",
    date: "2024-03-09",
    description: "Depósito cliente XYZ",
    amount: 3200.5,
    accountName: "Conta Corrente Principal",
    type: "credit",
    status: "completed",
    category: "Receita",
    createdAt: "2024-03-09T10:15:00Z",
  },
  {
    id: "3",
    date: "2024-03-08",
    description: "Transferência PIX",
    amount: -250.0,
    accountName: "Conta Empresa",
    type: "transfer",
    status: "pending",
    category: "Transferência",
    createdAt: "2024-03-08T16:45:00Z",
  },
  {
    id: "4",
    date: "2024-03-07",
    description: "Tarifa mensal",
    amount: -45.9,
    accountName: "Conta Corrente Principal",
    type: "debit",
    status: "completed",
    category: "Tarifas",
    createdAt: "2024-03-07T09:00:00Z",
  },
  {
    id: "5",
    date: "2024-03-06",
    description: "Venda produto A",
    amount: 890.0,
    accountName: "Conta Empresa",
    type: "credit",
    status: "completed",
    category: "Receita",
    createdAt: "2024-03-06T11:20:00Z",
  },
];

export function getRecentTransactions(): Promise<Transaction[]> {
  return mockDelay(recentTransactionsMock);
}

export function getBalanceOverTime(): Promise<BalancePoint[]> {
  return mockDelay([
    { date: "2024-03-01", balance: 42100.0, label: "1º mar" },
    { date: "2024-03-04", balance: 47100.0, label: "4º mar" },
    { date: "2024-03-06", balance: 47990.0, label: "6º mar" },
    { date: "2024-03-07", balance: 47944.1, label: "7º mar" },
    { date: "2024-03-08", balance: 47694.1, label: "8º mar" },
    { date: "2024-03-09", balance: 50894.6, label: "9º mar" },
    { date: "2024-03-10", balance: 49394.6, label: "10º mar" },
  ]);
}
