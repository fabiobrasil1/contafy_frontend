"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardSummary,
  getRecentTransactions,
  getBalanceOverTime,
} from "@/lib/mocks/dashboard.mock";
import { queryKeys } from "./query-keys";

export function useDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: getDashboardSummary,
  });
}

export function useRecentTransactions() {
  return useQuery({
    queryKey: queryKeys.dashboard.recentTransactions(),
    queryFn: getRecentTransactions,
  });
}

export function useBalanceOverTime() {
  return useQuery({
    queryKey: queryKeys.dashboard.balanceOverTime(),
    queryFn: getBalanceOverTime,
  });
}
