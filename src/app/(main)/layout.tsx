import type { Metadata } from "next";

import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Financify - Dashboard",
  description: "Controle os seus gastos de forma simples e eficiente",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <Header />
      {children}
    </ConvexClientProvider>
  );
}
