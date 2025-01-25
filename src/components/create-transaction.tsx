"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftRightIcon } from "lucide-react";
import { CreateTransactionDialog } from "./create-transaction-dialog";

export function CreateTransaction() {
  const userHasAddedTransaction = false;

  return (
    <div className="card">
      {/* TODO: if user not added a transaction yet, show other message */}
      <h1 className="heading">
        {userHasAddedTransaction
          ? "Adicione uma nova transação"
          : "Vamos começar adicionando uma nova transação"}
      </h1>

      <p className="description">
        Gerencie todos os seus gastos e ganhos em um só lugar. Adicione uma nova
        transação para começar.
      </p>

      <CreateTransactionDialog>
        <Button>
          <ArrowLeftRightIcon />
          Adicionar transação
        </Button>
      </CreateTransactionDialog>
    </div>
  );
}
