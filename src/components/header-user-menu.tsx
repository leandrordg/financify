import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOutIcon,
  SettingsIcon,
  User2Icon,
  UserRoundIcon,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export async function HeaderUserMenu() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User2Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-48">
        <div className="p-2">
          <h3 className="text-sm font-medium line-clamp-1">{user?.fullName}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserRoundIcon />
          Minha conta
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <SignOutButton>
          <DropdownMenuItem>
            <LogOutIcon />
            Sair
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
