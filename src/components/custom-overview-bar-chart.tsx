"use client";

import { formatMonth } from "@/lib/utils";
import { useQuery } from "convex/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { api } from "../../convex/_generated/api";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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

const chartConfig = {
  income: {
    label: "Entrada",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Saída",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CustomOverviewBarChart() {
  const [months, setMonths] = useQueryState(
    "overviewChart",
    parseAsInteger.withDefault(3)
  );

  const transactions = useQuery(api.transactions.getTransactionsByMonths, {
    months,
  });

  const chartData = transactions?.flatMap((transaction) => ({
    month: formatMonth(transaction.month),
    income: transaction.incomes.length,
    expense: transaction.expenses.length,
  }));

  return (
    <article className="card">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="heading">Visão geral das transações</h1>
          <p className="description">
            Resumo das transações dos últimos {months} meses.
          </p>
        </div>

        <Select
          onValueChange={(value) => setMonths(Number(value))}
          defaultValue={String(months)}
        >
          <SelectTrigger className="ml-auto md:w-fit gap-2">
            <SelectValue placeholder="Exibir transações" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Exibir transações</SelectLabel>
              <SelectItem value="3">3 meses</SelectItem>
              <SelectItem value="6">6 meses</SelectItem>
              <SelectItem value="12">12 meses</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {transactions === undefined && (
        <Skeleton className="h-44 sm:h-64 md:h-96 w-full mt-2 text-red-600" />
      )}

      {transactions?.length !== 0 && (
        <ChartContainer config={chartConfig} className="mt-2">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="hsl(var(--chart-2))" radius={4} />
            <Bar dataKey="expense" fill="hsl(var(--chart-1))" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </article>
  );
}
