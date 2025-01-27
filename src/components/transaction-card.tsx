import { formatExpensePayment, formatValue } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Doc } from "../../convex/_generated/dataModel";

import { CircleArrowDownIcon, CircleArrowUpIcon } from "lucide-react";

interface Props {
  transaction: Doc<"transactions">;
}

export function TransactionCard({ transaction }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 border px-4 py-2 rounded-lg bg-background">
      {transaction.type === "income" ? (
        <CircleArrowUpIcon className="text-green-600" />
      ) : (
        <CircleArrowDownIcon className="text-red-600" />
      )}

      <div className="flex flex-col">
        <h3 className="text-sm font-medium">{transaction.name}</h3>

        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            {format(transaction.transactionDate, "PPP", { locale: ptBR })}
          </div>
        </div>
      </div>

      <div className="mt-auto md:mt-0 md:ml-auto md:text-end">
        <p className="text-xs text-muted-foreground">
          {transaction.type === "expense" &&
            formatExpensePayment(
              transaction.value,
              transaction.paymentMethod,
              transaction.paymentParcels
            )}
        </p>
        <p className="text-lg md:text-base font-medium tracking-tighter">
          {formatValue(transaction.value)}
        </p>
      </div>
    </div>
  );
}
