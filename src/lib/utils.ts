import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToNumber(date: Date | undefined) {
  return date ? date.getTime() : new Date().getTime();
}

export function formatTransactionType(type: string) {
  switch (type) {
    case "income":
      return "Entrada";
    case "expense":
      return "Saída";
    default:
      return type;
  }
}

export function formatMonth(month: string) {
  switch (month) {
    case "January":
      return "Janeiro";
    case "February":
      return "Fevereiro";
    case "March":
      return "Março";
    case "April":
      return "Abril";
    case "May":
      return "Maio";
    case "June":
      return "Junho";
    case "July":
      return "Julho";
    case "August":
      return "Agosto";
    case "September":
      return "Setembro";
    case "October":
      return "Outubro";
    case "November":
      return "Novembro";
    case "December":
      return "Dezembro";
    default:
      return month;
  }
}

export function formatPaymentMethod(method: string | undefined) {
  switch (method) {
    case "pix":
      return "Pix";
    case "crypto":
      return "Criptomoeda";
    case "credit":
      return "Crédito";
    case "debit":
      return "Débito";
    case "cash":
      return "Dinheiro";
    default:
      return method;
  }
}

export function formatTransactionCategory(category: string) {
  switch (category) {
    case "bonus":
      return "Bônus";
    case "salary":
      return "Salário";
    case "investment":
      return "Investimento";
    case "bills":
      return "Contas";
    case "shopping":
      return "Compras";
    case "food":
      return "Alimentação";
    case "transport":
      return "Transporte";
    case "health":
      return "Saúde";
    case "leisure":
      return "Lazer";
    case "education":
      return "Educação";
    case "others":
      return "Outros";
    default:
      return category;
  }
}

export function formatValue(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatParcelsFromValue(
  value: number,
  parcels: number | undefined
) {
  if (parcels === 1) return "À vista (1x)";

  return parcels && `${parcels}x de ${formatValue(value / parcels)}`;
}

export function formatExpensePayment(
  value: number,
  method: string | undefined,
  parcels: number | undefined
) {
  const formattedParcels = formatParcelsFromValue(value, parcels);
  const formattedMethod = formatPaymentMethod(method);

  // if method is credit or debit and has parcels
  if ((method === "credit" || method === "debit") && parcels)
    return `${formattedMethod} - ${formattedParcels}`;

  return formattedMethod;
}
