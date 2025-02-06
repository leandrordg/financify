import Link from "next/link";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  PieChart,
  Wallet,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Financify</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Iniciar
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10" />
          <div className="max-w-7xl mx-auto flex flex-col sm:items-center justify-center space-y-8 py-24 text-center md:py-32">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Gerencie suas finanças
              <br />
              <span className="text-blue-600">Com Confiança</span>
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              Assuma o controle de suas finanças pessoais com nosso abrangente
              sistema de gestão. Acompanhe, planeje e aumente seu patrimônio em
              um só lugar lugar.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <Link href="/dashboard">
                  Comece Agora
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto py-24 px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tudo o que você precisa para administrar seu dinheiro
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Recursos poderosos para ajudá-lo a rastrear, analisar e otimizar
                seu finanças.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 hover:border-blue-600 transition-colors text-center">
              <BarChart3 className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-bold">Acompanhamento de despesas</h3>
              <p className="text-muted-foreground">
                Acompanhe suas despesas em tempo real e categoriza-as
                automaticamente.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 hover:border-blue-600 transition-colors text-center">
              <PieChart className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-bold">
                Planejamento Orçamentário Completo
              </h3>
              <p className="text-muted-foreground">
                Crie e gerencie orçamentos que ajudam você a atingir seus
                objetivos financeiros metas.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 hover:border-blue-600 transition-colors text-center">
              <ArrowUpRight className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-bold">
                Acompanhamento de investimentos
              </h3>
              <p className="text-muted-foreground">
                Monitore seus investimentos e acompanhe o desempenho do seu
                portfólio.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-blue-600 py-16 text-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold">10K+</div>
                <div className="mt-2 text-blue-100">Usuários Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">R$ 2M+</div>
                <div className="mt-2 text-blue-100">Dinheiro rastreado</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">98%</div>
                <div className="mt-2 text-blue-100">Satisfação do Cliente</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto py-24 px-4">
          <div className="flex flex-col sm:items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pronto para assumir o controle de suas finanças?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Junte-se a milhares de usuários que já gerenciam suas finanças
                melhor com o Financify.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <Link href="/dashboard">
                  Comece Agora
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">Entrar em contato</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Financify</span>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link
              href="#terms"
              className="text-sm hover:underline underline-offset-4"
            >
              Termos
            </Link>
            <Link
              href="#privacy"
              className="text-sm hover:underline underline-offset-4"
            >
              Privacidade
            </Link>
            <Link
              href="#contact"
              className="text-sm hover:underline underline-offset-4"
            >
              Contato
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Financify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
