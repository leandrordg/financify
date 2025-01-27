"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckIcon,
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  CirclePlusIcon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react";

const formSchema = z.object({
  categories: z.array(
    z.object({
      name: z.string().min(1, "Campo obrigatório"),
      type: z.enum(["income", "expense"]),
    })
  ),
});

export function NewCategoryForm() {
  const router = useRouter();

  const createCategory = useMutation(api.categories.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [{ name: "", type: "income" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createCategory(values)
      .then(() => {
        toast.success("Categoria(s) criada com sucesso");
        router.push("/dashboard");
      })
      .catch(() => {
        toast.error("Erro ao criar uma ou mais categoria(s).", {
          description: "Verifique se a categoria já existe.",
        });
      });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
        <section className="grid list grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`categories.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-[3]">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite o nome"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name={`categories.${index}.type`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="income">
                            <CircleArrowUpIcon className="size-4 text-green-600 inline-block mr-2" />
                            Entrada
                          </SelectItem>
                          <SelectItem value="expense">
                            <CircleArrowDownIcon className="size-4 text-red-600 inline-block mr-2" />
                            Saída
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outline"
                    className="text-muted-foreground hover:text-foreground"
                    disabled={isSubmitting}
                  >
                    <Trash2Icon />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </section>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (fields.length === 10) return;
              append({ name: "", type: "income" });
            }}
            disabled={fields.length === 10 || isSubmitting}
          >
            <CirclePlusIcon />
            Adicionar mais
          </Button>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <>
                <CheckIcon />
                Salvar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
