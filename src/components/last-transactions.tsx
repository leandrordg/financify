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
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRightIcon } from "lucide-react";

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
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="space-y-2">
          <Link
            href="/transactions"
            className="heading flex items-center gap-2 w-fit"
          >
            Últimas transações <ChevronRightIcon className="size-4" />
          </Link>
          <p className="description">
            Veja as últimas {limit} transações registradas no sistema.
          </p>
        </div>

        <Select
          disabled={transactions?.length === 0}
          onValueChange={(value) => setLimit(Number(value))}
          defaultValue={String(limit)}
        >
          <SelectTrigger className="ml-auto md:w-fit gap-2">
            <SelectValue placeholder="Exibir transações" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Exibir transações</SelectLabel>
              <SelectItem value="3">Últimas 3</SelectItem>
              <SelectItem value="5">Últimas 5</SelectItem>
              <SelectItem value="10">Últimas 10</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
