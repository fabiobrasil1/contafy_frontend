"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";

/**
 * Placeholder for future Stripe/billing integration.
 * Phase 6 deliverable: Billing section placeholder.
 */
export function BillingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Faturamento
        </CardTitle>
        <CardDescription>
          Gerencie seu plano e forma de pagamento. A integração com Stripe será
          disponibilizada em uma próxima versão.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          Em breve: planos, assinaturas e pagamentos.
        </div>
      </CardContent>
    </Card>
  );
}
