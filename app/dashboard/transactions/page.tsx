"use client";

import { useCallback, useState } from "react";
import { useTransactions } from "@/lib/api/transactions";
import type { TransactionFilters as TransactionFiltersType } from "@/types/transaction";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransactionFilters } from "@/components/dashboard/TransactionFilters";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_FILTERS: TransactionFiltersType = {
  page: 1,
  pageSize: 10,
};

export default function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionFiltersType>(DEFAULT_FILTERS);
  const { data, isLoading } = useTransactions(filters);

  const handleFiltersChange = useCallback((newFilters: TransactionFiltersType) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const total = data?.total ?? 0;
  const page = data?.page ?? 1;
  const pageSize = data?.pageSize ?? 10;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Transações</h1>
          <p className="text-muted-foreground text-sm">
            Consulte e filtre as transações por conta, tipo, status e período.
          </p>
        </div>

        <TransactionFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />

        <div className="rounded-md border border-border">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Carregando...
            </div>
          ) : (
            <>
              <TransactionTable data={data?.data ?? []} />
              {total > 0 && totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-border px-4 py-3">
                  <p className="text-sm text-muted-foreground">
                    Mostrando {(page - 1) * pageSize + 1} a{" "}
                    {Math.min(page * pageSize, total)} de {total} transações
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleFiltersChange({ ...filters, page: page - 1 })
                      }
                      disabled={!hasPrev}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleFiltersChange({ ...filters, page: page + 1 })
                      }
                      disabled={!hasNext}
                    >
                      Próxima
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
