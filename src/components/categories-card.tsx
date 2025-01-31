"use client";

import Link from "next/link";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Skeleton } from "./ui/skeleton";

export function CategoriesCard() {
  const data = useQuery(api.categories.get);

  return (
    <article className="card">
      <div className="space-y-2">
        <h2 className="heading">Buscar por categorias</h2>
        <p className="description">
          Selecione uma categoria para ver as transações relacionadas.
        </p>
      </div>

      {data === undefined && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="p-10" />
          ))}
        </div>
      )}

      {data?.categories.length !== 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {data?.categories.map((category) => (
            <Link key={category._id} href={`/categories/${category._id}`}>
              <div
                key={category._id}
                className="flex items-center justify-center p-10 rounded-md border cursor-pointer hover:bg-muted description hover:text-foreground"
              >
                <p>{category.name}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </article>
  );
}
