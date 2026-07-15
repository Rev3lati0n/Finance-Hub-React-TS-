import { createContext, useContext, useEffect, useState } from "react";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  notes: string;
};

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
};

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem("financehub-expenses");
    alert("Loaded expenses: " + saved);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    console.log("Saving expenses:", expenses);
  
    localStorage.setItem(
      "financehub-expenses",
      JSON.stringify(expenses)
    );
  
    console.log(
      "Saved value:",
      localStorage.getItem("financehub-expenses")
    );
  }, [expenses]);

  function addExpense(expense: Omit<Expense, "id">) {
    setExpenses((prev) => [
      ...prev,
      {
        ...expense,
        id: Date.now().toString(),
      },
    ]);
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("ExpenseProvider missing");
  }

  return context;
}