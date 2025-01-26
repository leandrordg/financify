"use client";

import Link from "next/link";

import { formatValue } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

import { TransactionCard } from "@/components/transaction-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeftIcon, InfoIcon } from "lucide-react";
import { InfoBanner } from "@/components/info-banner";

export default function TransactionsPage() {
  const transactions = useQuery(api.transactions.get);

  return (
    <main className="max-w-4xl mx-auto space-y-4 bg-muted/50 md:p-4 md:border-x min-h-dvh py-4">
      <article className="card gap-4">
        <Link href="/dashboard" className="flex items-center gap-1 w-fit">
          <ChevronLeftIcon className="size-4" />

          <h1 className="heading">Todas as transações</h1>
        </Link>

        {transactions === undefined ? (
          <TransactionsSkeleton />
        ) : (
          <TransactionsList transactions={transactions} />
        )}
      </article>
    </main>
  );
}

const TransactionsList = ({
  transactions,
}: {
  transactions: Doc<"transactions">[];
}) => {
  type Totals = {
    incomeTransactions: Doc<"transactions">[];
    expenseTransactions: Doc<"transactions">[];
    totalIncome: number;
    totalExpense: number;
  };

  const { totalIncome, totalExpense, incomeTransactions, expenseTransactions } =
    transactions?.reduce<Totals>(
      (totals, transaction) => {
        const key =
          transaction.type === "income"
            ? "incomeTransactions"
            : "expenseTransactions";
        const totalKey =
          transaction.type === "income" ? "totalIncome" : "totalExpense";

        totals[key].push(transaction);
        totals[totalKey] += transaction.value;

        return totals;
      },
      {
        incomeTransactions: [],
        expenseTransactions: [],
        totalIncome: 0,
        totalExpense: 0,
      }
    ) || {
      incomeTransactions: [],
      expenseTransactions: [],
      totalIncome: 0,
      totalExpense: 0,
    };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="description">Entradas ({formatValue(totalIncome)})</h2>

      {incomeTransactions.length === 0 && (
        <InfoBanner>Nenhuma entrada encontrada.</InfoBanner>
      )}

      {incomeTransactions?.length !== 0 && (
        <div className="flex flex-col gap-4">
          {incomeTransactions?.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      )}

      <h2 className="description">Saídas ({formatValue(totalExpense)})</h2>

      {expenseTransactions.length === 0 && (
        <InfoBanner>Nenhuma despesa encontrada.</InfoBanner>
      )}

      {expenseTransactions?.length !== 0 && (
        <div className="flex flex-col gap-4">
          {expenseTransactions?.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      )}
    </section>
  );
};

const TransactionsSkeleton = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="w-48 h-4" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-48 h-4" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
  </div>
);
