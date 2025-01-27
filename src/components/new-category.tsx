import { NewCategoryForm } from "@/components/forms/new-category-form";

export function NewCategory() {
  return (
    <article className="card">
      <h1 className="heading">Adicionar uma nova categoria</h1>

      <p className="description">
        Adicione uma ou mais categorias para organizar suas transações. Até 10
        categorias por vez.
      </p>

      <NewCategoryForm />
    </article>
  );
}
