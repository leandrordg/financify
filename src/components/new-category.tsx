import Link from "next/link";

import { NewCategoryForm } from "@/components/forms/new-category-form";
import { ChevronLeftIcon } from "lucide-react";

export function NewCategory() {
  return (
    <article className="card">
      <Link href="/dashboard" className="flex items-center gap-1 w-fit">
        <ChevronLeftIcon className="size-4" />

        <h1 className="heading">Adicionar uma nova categoria</h1>
      </Link>

      <p className="description">
        Adicione uma ou mais categorias para organizar suas transações. Até 10
        categorias por vez.
      </p>

      <NewCategoryForm />
    </article>
  );
}
