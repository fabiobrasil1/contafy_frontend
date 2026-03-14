"use client";

import type { BalancePoint } from "@/types/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

interface ChartBalanceProps {
  data: BalancePoint[];
  isLoading?: boolean;
}

export function ChartBalance({ data, isLoading }: ChartBalanceProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolução do saldo</CardTitle>
          <CardDescription>Últimos 7 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center text-muted-foreground text-sm">
            Carregando...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolução do saldo</CardTitle>
          <CardDescription>Últimos 7 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Sem dados disponíveis.</p>
        </CardContent>
      </Card>
    );
  }

  const minBalance = Math.min(...data.map((d) => d.balance));
  const maxBalance = Math.max(...data.map((d) => d.balance));
  const range = maxBalance - minBalance || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução do saldo</CardTitle>
        <CardDescription>Últimos 7 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[200px] items-end gap-1">
          {data.map((point) => {
            const heightPercent = ((point.balance - minBalance) / range) * 80 + 20;
            return (
              <div
                key={point.date}
                className="flex flex-1 flex-col items-center gap-1"
                title={`${point.label}: ${formatCurrency(point.balance)}`}
              >
                <div
                  className="w-full min-h-[4px] rounded-t bg-primary/80 transition-all"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] text-muted-foreground truncate max-w-full">
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatCurrency(minBalance)}</span>
          <span>{formatCurrency(maxBalance)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
