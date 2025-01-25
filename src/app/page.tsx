import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main>
      <section className="max-w-4xl mx-auto p-8 space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter uppercase bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">
          Financify
        </h1>

        <p className="text-lg">
          Acompanhe suas finanças de forma simples e eficiente. Com o Financify
          você pode controlar suas despesas e receitas de forma fácil e rápida.
        </p>

        <div>
          <Button>Ver mais</Button>
          <Button variant="link" asChild>
            <Link href="/dashboard">Ir para a dashboard</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
