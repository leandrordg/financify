import { InfoIcon } from "lucide-react";

interface Props {
  children?: React.ReactNode;
}

export function InfoBanner({ children }: Props) {
  return (
    <div className="border rounded-md p-4 bg-muted/30 flex flex-col gap-2 xs:flex-row xs:items-center xs:gap-4">
      <InfoIcon className="size-4 text-muted-foreground shrink-0" />

      <p className="description">{children}</p>
    </div>
  );
}
