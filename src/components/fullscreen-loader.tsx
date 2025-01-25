import { Loader2Icon } from "lucide-react";

export function FullscreenLoader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col gap-1.5 items-center justify-center h-dvh text-muted-foreground">
      <Loader2Icon className="size-6 animate-spin" />
      {label && <span className="text-xs">{label}</span>}
    </div>
  );
}
