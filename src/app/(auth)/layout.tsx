import { ClerkProvider } from "@clerk/nextjs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="flex justify-center items-center h-dvh bg-neutral-100">
        {children}
      </div>
    </ClerkProvider>
  );
}
