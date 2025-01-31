"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

import { Skeleton } from "@/components/ui/skeleton";
import { formatTransactionType } from "@/lib/utils";
import { TransactionCard } from "./transaction-card";

interface Props {
  categoryId: Id<"categories">;
}

export function CategorySection({ categoryId }: Props) {
  const data = useQuery(api.categories.getById, { categoryId });

  if (data === undefined) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <article className="card">
        <div className="space-y-2">
          <h1 className="heading">Exibindo {data.category.name}</h1>
          <p className="description">
            {formatTransactionType(data.category.type)}
          </p>
        </div>
      </article>

      <article className="card">
        <div className="space-y-2">
          <h1 className="heading">Transações</h1>
          <p className="description">
            Exibindo todas as transações relacionadas a {data.category.name}.
          </p>
        </div>

        <div className="grid list grid-cols-1 gap-4 sm:grid-cols-2">
          {data.transactions.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      </article>
    </section>
  );
}
