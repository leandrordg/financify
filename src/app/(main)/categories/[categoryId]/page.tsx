import { HistoryBack } from "@/components/history-back";
import { Id } from "../../../../../convex/_generated/dataModel";
import { CategorySection } from "@/components/category-section";

interface Props {
  params: Promise<{ categoryId: Id<"categories"> }>;
}

export default async function IndividualCategoryPage({ params }: Props) {
  const { categoryId } = await params;

  return (
    <main className="max-w-4xl mx-auto space-y-4 bg-muted/50 md:p-4 md:border-x min-h-dvh py-4">
      <HistoryBack />
      <CategorySection categoryId={categoryId} />
    </main>
  );
}
