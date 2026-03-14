import type { Reconciliation, CreateReconciliationInput } from "@/types/reconciliation";

const ALLOWED_TYPES = ["application/pdf", "text/csv", "application/x-ofx"] as const;
const EXTENSIONS = ["pdf", "csv", "ofx"] as const;

function getFileExtension(file: File): string {
  const name = file.name.toLowerCase();
  const ext = name.split(".").pop() ?? "";
  return ext;
}

function mockDelay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

let mockReconciliations: Reconciliation[] = [
  {
    id: "1",
    accountName: "Conta Corrente Principal",
    bankName: "Banco do Brasil",
    statementDate: "2024-01-15",
    description: "Extrato janeiro/2024",
    fileName: "extrato-jan-2024.pdf",
    fileType: "pdf",
    createdAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "2",
    accountName: "Conta Empresa",
    bankName: "Itaú",
    statementDate: "2024-01-31",
    description: "Fechamento mensal",
    fileName: "fechamento-jan.csv",
    fileType: "csv",
    createdAt: "2024-02-01T09:30:00Z",
  },
];

let nextId = 3;

export function getReconciliations(): Promise<Reconciliation[]> {
  return mockDelay([...mockReconciliations]);
}

export function createReconciliation(
  input: CreateReconciliationInput
): Promise<Reconciliation> {
  const ext = getFileExtension(input.file);
  const fileType =
    ext === "pdf" ? "pdf" : ext === "ofx" ? "ofx" : "csv";

  const newItem: Reconciliation = {
    id: String(nextId++),
    accountName: input.accountName,
    bankName: input.bankName,
    statementDate: input.statementDate,
    description: input.description,
    fileName: input.file.name,
    fileType,
    createdAt: new Date().toISOString(),
  };

  mockReconciliations = [newItem, ...mockReconciliations];
  return mockDelay(newItem);
}

export function deleteReconciliation(id: string): Promise<void> {
  mockReconciliations = mockReconciliations.filter((r) => r.id !== id);
  return mockDelay(undefined);
}

export { ALLOWED_TYPES, EXTENSIONS };
