"use client";

import Link from "next/link";

import { formatValue } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

import { TransactionCard } from "@/components/transaction-card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";

export default function TransactionsPage() {
  const transactions = useQuery(api.transactions.get);

  if (!transactions) return null;

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
    <main className="max-w-4xl mx-auto space-y-4 bg-muted/50 md:p-4 md:border-x min-h-dvh">
      <section className="card">
        <div className="px-4 pt-4 md:p-0">
          <Link href="/dashboard" className="flex items-center gap-1 w-fit">
            <ChevronLeftIcon className="size-4" />

            <h1 className="heading">Todas as transações</h1>
          </Link>
        </div>

        <h2 className="description">Entradas ({formatValue(totalIncome)})</h2>

        <div className="flex flex-col gap-2">
          {incomeTransactions.length === 0 && (
            <p className="description">Nenhuma entrada cadastrada.</p>
          )}
          {incomeTransactions?.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>

        <Separator orientation="horizontal" className="my-4" />

        <h2 className="description">Despesas ({formatValue(totalExpense)})</h2>

        <div className="flex flex-col gap-2">
          {expenseTransactions.length === 0 && (
            <p className="description">
              Você não possui nenhuma despesa cadastrada. Parece que está tudo
              em ordem!
            </p>
          )}
          {expenseTransactions?.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      </section>
    </main>
  );
}
