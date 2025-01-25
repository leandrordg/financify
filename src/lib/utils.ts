import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToNumber(date: Date | undefined) {
  return date ? date.getTime() : new Date().getTime();
}
