"use client";

import { useCallback, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { TransactionFilters as TransactionFiltersType, TransactionStatus, TransactionType } from "@/types/transaction";

const ACCOUNTS = ["Conta Corrente Principal", "Conta Empresa"];
const TYPES: { value: TransactionType; label: string }[] = [
  { value: "credit", label: "Crédito" },
  { value: "debit", label: "Débito" },
  { value: "transfer", label: "Transferência" },
];
const STATUSES: { value: TransactionStatus; label: string }[] = [
  { value: "completed", label: "Concluída" },
  { value: "pending", label: "Pendente" },
  { value: "cancelled", label: "Cancelada" },
];

interface TransactionFiltersProps {
  filters: TransactionFiltersType;
  onFiltersChange: (filters: TransactionFiltersType) => void;
  onReset?: () => void;
}

export function TransactionFilters({
  filters,
  onFiltersChange,
  onReset,
}: TransactionFiltersProps) {
  const [search, setSearch] = useState(filters.search ?? "");

  const updateFilter = useCallback(
    <K extends keyof TransactionFiltersType>(key: K, value: TransactionFiltersType[K]) => {
      onFiltersChange({ ...filters, [key]: value ?? undefined, page: 1 });
    },
    [filters, onFiltersChange]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("search", search.trim() || undefined);
  };

  const handleClear = () => {
    setSearch("");
    onFiltersChange({
      page: 1,
      pageSize: filters.pageSize ?? 10,
    });
    onReset?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Buscar
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              type="search"
              placeholder="Buscar por descrição, conta ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <Button type="submit" variant="secondary">
            Buscar
          </Button>
          {(filters.search || filters.accountName || filters.type || filters.status || filters.dateFrom || filters.dateTo) && (
            <Button type="button" variant="ghost" onClick={handleClear}>
              Limpar filtros
            </Button>
          )}
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="grid gap-2">
          <Label>Conta</Label>
          <Select
            value={filters.accountName ?? "all"}
            onValueChange={(v) => updateFilter("accountName", v === "all" ? undefined : v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as contas</SelectItem>
              {ACCOUNTS.map((acc) => (
                <SelectItem key={acc} value={acc}>
                  {acc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Tipo</Label>
          <Select
            value={filters.type ?? "all"}
            onValueChange={(v) => updateFilter("type", v === "all" ? undefined : (v as TransactionType))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Status</Label>
          <Select
            value={filters.status ?? "all"}
            onValueChange={(v) => updateFilter("status", v === "all" ? undefined : (v as TransactionStatus))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dateFrom">Data de</Label>
          <Input
            id="dateFrom"
            type="date"
            value={filters.dateFrom ?? ""}
            onChange={(e) => updateFilter("dateFrom", e.target.value || undefined)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dateTo">Data até</Label>
          <Input
            id="dateTo"
            type="date"
            value={filters.dateTo ?? ""}
            onChange={(e) => updateFilter("dateTo", e.target.value || undefined)}
          />
        </div>
      </div>
    </div>
  );
}
