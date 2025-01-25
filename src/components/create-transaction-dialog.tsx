"use client";

import { useState } from "react";

import { ExpenseDialogForm } from "@/components/forms/expense-dialog-form";
import { IncomeDialogForm } from "@/components/forms/income-dialog-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CreateTransactionDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar uma transação</DialogTitle>
          <DialogDescription>
            Controle as suas finanças adicionando uma nova transação.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="income">
          <TabsList>
            <TabsTrigger value="income">Entrada</TabsTrigger>
            <TabsTrigger value="expense">Despesa</TabsTrigger>
          </TabsList>
          <TabsContent value="income">
            <IncomeDialogForm setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="expense">
            <ExpenseDialogForm setOpen={setOpen} />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
