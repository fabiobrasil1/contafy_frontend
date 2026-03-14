export interface Reconciliation {
  id: string;
  accountName: string;
  bankName: string;
  statementDate: string;
  description: string;
  fileName: string;
  fileType: "pdf" | "csv" | "ofx";
  createdAt: string;
}

export interface CreateReconciliationInput {
  accountName: string;
  bankName: string;
  statementDate: string;
  description: string;
  file: File;
}
