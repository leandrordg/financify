import { CreateTransaction } from "@/components/create-transaction";

export default function DashboardPage() {
  return (
    <main className="max-w-4xl mx-auto bg-muted/50 md:p-4 md:border-x min-h-dvh">
      <CreateTransaction />
    </main>
  );
}
