import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Expense } from "../types/Expense";

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
};

const ExpenseContext = createContext<ExpenseContextType | null>(null);

const STORAGE_KEY = "financehub-expenses";

export function ExpenseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  function save(list: Expense[]) {
    setExpenses(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function addExpense(expense: Omit<Expense, "id">) {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
    };

    save([...expenses, newExpense]);
  }

  function deleteExpense(id: string) {
    save(expenses.filter((e) => e.id !== id));
  }

  function updateExpense(updated: Expense) {
    save(
      expenses.map((e) =>
        e.id === updated.id ? updated : e
      )
    );
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses must be used inside ExpenseProvider"
    );
  }

  return context;
}