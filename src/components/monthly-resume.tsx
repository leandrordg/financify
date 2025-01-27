"use client";

import { cn, formatPaymentMethod, formatValue } from "@/lib/utils";
import { useQuery } from "convex/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { api } from "../../convex/_generated/api";

import { InfoBanner } from "@/components/info-banner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function MonthlyResume() {
  const [month, setMonth] = useQueryState(
    "overviewChart",
    parseAsInteger.withDefault(1)
  );

  const transactions = useQuery(api.transactions.getByMonth, {
    month,
  });

  const incomeTransactions = transactions?.filter((t) => t.type === "income");
  const expenseTransactions = transactions?.filter((t) => t.type === "expense");

  const isDataEmpty = transactions?.length === 0;

  const months = {
    current: new Date(new Date().getFullYear(), month - 1, 1).toLocaleString(
      "default",
      { month: "long" }
    ),
    last: (months: number) => {
      const now = new Date();

      return Array.from({ length: months }, (_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        return {
          label: date.toLocaleString("default", { month: "long" }),
          value: date.getMonth() + 1,
          current: i === 0,
        };
      }).reverse();
    },
  };

  const values = {
    total:
      transactions?.reduce(
        (acc, t) => (t.type === "income" ? acc + t.value : acc - t.value),
        0
      ) ?? 0,
    totalIncome: incomeTransactions?.reduce((acc, t) => acc + t.value, 0) ?? 0,
    totalExpense:
      expenseTransactions?.reduce((acc, t) => acc + t.value, 0) ?? 0,
  };

  const mostUsedPaymentMethod = transactions
    ?.map((t) => t.paymentMethod)
    .sort(
      (a, b) =>
        transactions?.filter((t) => t.paymentMethod === b).length -
        transactions?.filter((t) => t.paymentMethod === a).length
    )[0];

  const incomePercentage = (values.total / values.totalIncome) * 100;

  return (
    <article className="card">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="heading">Visão geral das transações</h1>
          <p className="description">
            Veja um resumo das suas transações do mês de {months.current}.
          </p>
        </div>

        <Select
          onValueChange={(value) => setMonth(Number(value))}
          defaultValue={String(month)}
        >
          <SelectTrigger className="ml-auto md:w-fit gap-2 capitalize">
            <SelectValue placeholder="Exibir transações" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Exibir transações</SelectLabel>
              {months.last(12).map((item) => (
                <div key={item.value}>
                  {item.current && <SelectSeparator />}
                  <SelectItem value={String(item.value)} className="capitalize">
                    {item.label} {item.current && "(atual)"}
                  </SelectItem>
                </div>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {transactions === undefined && <Skeleton className="w-full h-16" />}

      {isDataEmpty && (
        <InfoBanner>
          Nenhuma transação encontrada para o mês selecionado.
        </InfoBanner>
      )}

      {transactions !== undefined && !isDataEmpty && (
        <div className="flex flex-col gap-4 mt-2">
          {/* top card */}
          <div className="card-inside">
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <p className="description">Saldo do mês</p>
                <p className="price">{formatValue(values.total)}</p>
              </div>

              <div>
                <p className="description">Qtd. de transações</p>
                <p className="price">{transactions?.length}</p>
              </div>

              <div>
                <p className="description">Método mais utilizado</p>
                <p className="price">
                  {formatPaymentMethod(mostUsedPaymentMethod)}
                </p>
              </div>

              <div>
                {/* percentage */}
                <p className="description">Entradas x Total</p>
                <p
                  className={cn("price", {
                    "text-green-600": incomePercentage > 75,
                    "text-yellow-600":
                      incomePercentage >= 25 && incomePercentage <= 75,
                    "text-red-600": incomePercentage < 25,
                  })}
                >
                  {incomePercentage.toFixed()}%
                </p>
              </div>
            </div>
          </div>

          {/* bottom cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* income */}
            <div className="card-inside">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <p className="description">Total de entradas</p>
                  <p className="price text-green-600">
                    {formatValue(values.totalIncome)}
                  </p>
                </div>

                <div>
                  <p className="description">Qtd. transações</p>
                  <p className="price sm:text-end">
                    {incomeTransactions?.length}
                  </p>
                </div>
              </div>
            </div>

            {/* expense */}
            <div className="card-inside">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <p className="description">Total de saídas</p>
                  <p className="price text-red-600">
                    {formatValue(values.totalExpense)}
                  </p>
                </div>

                <div>
                  <p className="description">Qtd. transações</p>
                  <p className="price sm:text-end">
                    {expenseTransactions?.length}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </article>
  );
}
