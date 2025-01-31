import { CategoriesCard } from "@/components/categories-card";
import { CreateTransaction } from "@/components/create-transaction";
import { LastTransactions } from "@/components/last-transactions";
import { MonthlyResume } from "@/components/monthly-resume";

export default function DashboardPage() {
  return (
    <main className="max-w-4xl mx-auto space-y-4 bg-muted/50 md:p-4 md:border-x min-h-dvh py-4">
      <MonthlyResume />
      <CreateTransaction />
      <LastTransactions />
      <CategoriesCard />
    </main>
  );
}
