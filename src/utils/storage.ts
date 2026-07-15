import type { Expense } from "../types/Expense";

const KEY = "financehub-expenses";

export function getExpenses(): Expense[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveExpenses(expenses: Expense[]) {
  localStorage.setItem(KEY, JSON.stringify(expenses));
}