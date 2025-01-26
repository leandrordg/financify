import { CreateTransaction } from "@/components/create-transaction";
import { LastTransactions } from "@/components/last-transactions";

export default function DashboardPage() {
  return (
    <main className="max-w-4xl mx-auto space-y-4 bg-muted/50 md:p-4 md:border-x min-h-dvh">
      <CreateTransaction />
      <LastTransactions />
    </main>
  );
}
