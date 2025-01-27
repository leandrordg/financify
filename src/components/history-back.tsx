"use client";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "lucide-react";

export function HistoryBack() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <article className="card">
      <button onClick={handleClick} className="flex items-center gap-1 w-fit text-foreground/85 hover:text-foreground transition-colors">
        <ChevronLeftIcon className="size-4"/>

        <h1 className="text-sm font-medium">Voltar</h1>
      </button>
    </article>
  );
}
