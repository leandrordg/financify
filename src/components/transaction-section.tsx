"use client";

import { useQuery } from "convex/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  transactionId: Id<"transactions">;
}

export function TransactionSection({ transactionId }: Props) {
  const transaction = useQuery(api.transactions.getById, { transactionId });

  if (transaction === undefined) return <Skeleton className="w-full h-16" />;

  return (
    <article className="card gap-4">
      <div className="space-y-2">
        <h2 className="heading">{transaction.name}</h2>

        <p className="description">
          {format(new Date(transaction.transactionDate), "PPP", {
            locale: ptBR,
          })}
        </p>
      </div>
    </article>
  );
}
