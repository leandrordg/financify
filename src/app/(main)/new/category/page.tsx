import { HistoryBack } from "@/components/history-back";
import { NewCategory } from "@/components/new-category";

export default function NewCategoryPage() {
  return (
    <main className="max-w-4xl mx-auto space-y-4 bg-muted/50 md:p-4 md:border-x min-h-dvh py-4">
      <HistoryBack />
      <NewCategory />
    </main>
  );
}
