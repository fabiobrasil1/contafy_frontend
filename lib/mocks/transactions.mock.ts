import type {
  Transaction,
  TransactionFilters,
  TransactionsResponse,
} from "@/types/transaction";

function mockDelay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

const mockTransactions: Transaction[] = [
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
  {
    id: "6",
    date: "2024-03-05",
    description: "Compra material",
    amount: -1200.0,
    accountName: "Conta Corrente Principal",
    type: "debit",
    status: "cancelled",
    category: "Compras",
    createdAt: "2024-03-05T08:00:00Z",
  },
  {
    id: "7",
    date: "2024-03-04",
    description: "TED recebido",
    amount: 5000.0,
    accountName: "Conta Empresa",
    type: "credit",
    status: "completed",
    category: "Receita",
    createdAt: "2024-03-04T14:00:00Z",
  },
  {
    id: "8",
    date: "2024-03-03",
    description: "Pagamento boleto",
    amount: -380.5,
    accountName: "Conta Corrente Principal",
    type: "debit",
    status: "completed",
    category: "Contas a pagar",
    createdAt: "2024-03-03T12:30:00Z",
  },
];

function applyFilters(
  list: Transaction[],
  filters: TransactionFilters | undefined
): Transaction[] {
  if (!filters) return [...list];

  let result = [...list];

  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.accountName.toLowerCase().includes(q) ||
        (t.category?.toLowerCase().includes(q) ?? false)
    );
  }
  if (filters.accountName) {
    result = result.filter((t) => t.accountName === filters.accountName);
  }
  if (filters.type) {
    result = result.filter((t) => t.type === filters.type);
  }
  if (filters.status) {
    result = result.filter((t) => t.status === filters.status);
  }
  if (filters.dateFrom) {
    result = result.filter((t) => t.date >= filters.dateFrom!);
  }
  if (filters.dateTo) {
    result = result.filter((t) => t.date <= filters.dateTo!);
  }

  return result;
}

export function getTransactions(
  filters?: TransactionFilters
): Promise<TransactionsResponse> {
  const filtered = applyFilters(mockTransactions, filters);
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 10;
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return mockDelay({
    data,
    total: filtered.length,
    page,
    pageSize,
  });
}

export function getTransactionById(id: string): Promise<Transaction | null> {
  const found = mockTransactions.find((t) => t.id === id);
  return mockDelay(found ?? null);
}
