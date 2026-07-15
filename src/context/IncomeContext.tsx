import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Income } from "../types/Income";

type IncomeContextType = {
  incomes: Income[];
  addIncome: (income: Omit<Income, "id">) => void;
  deleteIncome: (id: string) => void;
};

const IncomeContext = createContext<IncomeContextType | null>(null);

export function IncomeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [incomes, setIncomes] = useState<Income[]>(() => {
    const saved = localStorage.getItem("financehub-income");
    alert("Loaded income: " + saved);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const saved = localStorage.getItem("financehub-income");

    if (saved) {
      setIncomes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "financehub-income",
      JSON.stringify(incomes)
    );
  }, [incomes]);

  function addIncome(income: Omit<Income, "id">) {
    setIncomes((prev) => [
      ...prev,
      {
        ...income,
        id: Date.now().toString(),
      },
    ]);
  }

  function deleteIncome(id: string) {
    setIncomes((prev) =>
      prev.filter((income) => income.id !== id)
    );
  }

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        addIncome,
        deleteIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
}

export function useIncome() {
  const context = useContext(IncomeContext);

  if (!context) {
    throw new Error("IncomeProvider missing");
  }

  return context;
}