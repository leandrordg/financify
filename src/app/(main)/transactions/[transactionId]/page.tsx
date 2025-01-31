import { HistoryBack } from "@/components/history-back";
import { Id } from "../../../../../convex/_generated/dataModel";

import { TransactionSection } from "@/components/transaction-section";

interface Props {
  params: Promise<{ transactionId: Id<"transactions"> }>;
}

export default async function IndividualTransactionPage({ params }: Props) {
  const { transactionId } = await params;

  return (
    <main className="max-w-4xl mx-auto space-y-4 bg-muted/50 md:p-4 md:border-x min-h-dvh py-4">
      <HistoryBack />
      <TransactionSection transactionId={transactionId} />
    </main>
  );
}
