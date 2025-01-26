import Link from "next/link";

import { HeaderUserMenu } from "@/components/header-user-menu";

export function Header() {
  return (
    <header className="border-b">
      <div className="max-w-4xl mx-auto p-4 md:border-x flex items-center gap-4">
        <div className="md:px-4">
          <Link
            href="/dashboard"
            className="font-medium text-sm text-foreground/85 hover:text-foreground transition-colors"
          >
            Financify
          </Link>
        </div>

        <div className="flex items-center gap-4 ml-auto md:px-4">
          <HeaderUserMenu />
        </div>
      </div>
    </header>
  );
}
