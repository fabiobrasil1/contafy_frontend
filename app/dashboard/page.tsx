"use client";

import { Wallet, FileCheck, Receipt } from "lucide-react";
import { useDashboardSummary, useRecentTransactions, useBalanceOverTime } from "@/lib/api/dashboard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { ChartBalance } from "@/components/dashboard/ChartBalance";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: recentTransactions = [], isLoading: recentLoading } = useRecentTransactions();
  const { data: balanceOverTime = [], isLoading: chartLoading } = useBalanceOverTime();

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Painel</h1>
          <p className="text-muted-foreground text-sm">
            Visão geral das suas finanças e últimas movimentações.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Saldo total"
            value={summaryLoading ? "—" : formatCurrency(summary?.totalBalance ?? 0)}
            description="Soma dos saldos das contas"
            icon={Wallet}
          />
          <MetricCard
            title="Conciliações pendentes"
            value={summaryLoading ? "—" : (summary?.pendingReconciliations ?? 0)}
            description="Extratos aguardando conciliação"
            icon={FileCheck}
          />
          <MetricCard
            title="Total de transações"
            value={summaryLoading ? "—" : (summary?.transactionCount ?? 0)}
            description="No período atual"
            icon={Receipt}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartBalance data={balanceOverTime} isLoading={chartLoading} />
          <RecentTransactions data={recentTransactions} isLoading={recentLoading} />
        </div>
      </div>
    </div>
  );
}
