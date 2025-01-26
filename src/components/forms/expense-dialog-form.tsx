"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";

import { CustomDatePicker } from "@/components/custom-date-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, CheckCircleIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Campo obrigatório."),
  type: z.enum(["income", "expense"]),
  value: z
    .string()
    .min(1, "Campo obrigatório.")
    .regex(/^[1-9]\d*(?:\.\d{0,2})?$/, "Valor inválido."), // only allow numbers more than 0
  category: z.string().min(1, "Campo obrigatório."),
  paymentMethod: z.enum(["credit", "debit", "cash", "pix", "crypto"]),
  paymentParcels: z.string().optional(),
  transactionDate: z.number(),
});

interface Props {
  setOpen: (open: boolean) => void;
}

export function ExpenseDialogForm({ setOpen }: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const create = useMutation(api.transactions.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "expense",
      value: "",
      category: "",
      paymentMethod: "cash",
      paymentParcels: "",
      transactionDate: new Date().getTime(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    create(values)
      .then(() => {
        toast.success("Despesa adicionada com sucesso!");
        setOpen(false);
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao adicionar a despesa.");
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da despesa</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o valor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Método de pagamento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cash">Dinheiro</SelectItem>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="credit">Crédito</SelectItem>
                    <SelectItem value="debit">Débito</SelectItem>
                    <SelectItem value="crypto">Criptomoeda</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.watch("paymentMethod") === "credit" && (
          <FormField
            control={form.control}
            name="paymentParcels"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcelas</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                  </FormControl>
                  {/* TODO: add dynamic categories */}
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      if (i === 0) {
                        return (
                          <SelectItem key={i} value="1">
                            1x sem juros. (à vista)
                          </SelectItem>
                        );
                      }

                      return (
                        <SelectItem key={i} value={String(i + 1)}>
                          {i + 1}x sem juros.
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                {/* TODO: add dynamic categories */}
                <SelectContent>
                  <SelectItem value="food">Alimentação</SelectItem>
                  <SelectItem value="transport">Transporte</SelectItem>
                  <SelectItem value="health">Saúde</SelectItem>
                  <SelectItem value="education">Educação</SelectItem>
                  <SelectItem value="entertainment">Entretenimento</SelectItem>
                  <SelectItem value="vehicle">Veículo</SelectItem>
                  <SelectItem value="others">Outros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription>
                Caso a categoria desejada não esteja disponível, adicione uma
                nova categoria.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transactionDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data da transação</FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline">
                      {format(field.value, "PPP", { locale: ptBR })}
                      <CalendarIcon className="text-muted-foreground ml-auto" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <CustomDatePicker setOpen={setCalendarOpen} {...field} />
                </PopoverContent>
              </Popover>
              <FormDescription>
                A data da transação não pode ser maior que a data atual.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          <CheckCircleIcon />
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
