import { CreateTransactionDialog } from "@/components/dialogs/create-transaction-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeftRightIcon } from "lucide-react";

export function CreateTransaction() {
  return (
    <article className="card">
      <h1 className="heading">Adicione uma nova transação</h1>

      <p className="description">
        Gerencie todos os seus gastos e ganhos em um só lugar. Adicione uma nova
        transação para começar.
      </p>

      <CreateTransactionDialog>
        <Button size="sm" className="mt-2">
          <ArrowLeftRightIcon />
          Adicionar transação
        </Button>
      </CreateTransactionDialog>
    </article>
  );
}
