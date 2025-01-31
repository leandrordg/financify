import { HistoryBack } from "@/components/history-back";
import { MonthlyResume } from "@/components/monthly-resume";

export default function ResumePage() {
  return (
    <main className="max-w-4xl mx-auto space-y-4 bg-muted/50 md:p-4 md:border-x min-h-dvh py-4">
      <HistoryBack />
      <MonthlyResume />
    </main>
  );
}
