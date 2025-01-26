"use client";

import Link from "next/link";

import { useQuery } from "convex/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { api } from "../../convex/_generated/api";

import { TransactionCard } from "@/components/transaction-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRightIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export function LastTransactions() {
  const [limit, setLimit] = useQueryState(
    "lastTransactionsLimit",
    parseAsInteger.withDefault(3)
  );

  const transactions = useQuery(api.transactions.getLastTransactions, {
    limit,
  });

  return (
    <article className="card">
      <div className="flex items-center gap-4">
        <Link href="/transactions" className="flex items-center gap-1 w-fit">
          <h1 className="heading">Últimas transações</h1>

          <ChevronRightIcon className="size-4" />
        </Link>

        <Select
          disabled={transactions?.length === 0}
          onValueChange={(value) => setLimit(Number(value))}
          defaultValue={String(limit)}
        >
          <SelectTrigger className="ml-auto w-fit gap-2">
            <SelectValue placeholder="Exibir transações" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Exibir transações</SelectLabel>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <p className="description">
        Veja as suas últimas transações aqui. Você pode ver todas as suas
        transações na página de transações.
      </p>

      {transactions === undefined && (
        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 mt-2">
          {Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} className="w-full h-12" />
          ))}
        </div>
      )}

      {transactions?.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 mt-2">
          {transactions?.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </div>
      )}
    </article>
  );
}
