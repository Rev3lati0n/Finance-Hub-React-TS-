import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Income } from "../types/Income";

type IncomeContextType = {
  incomes: Income[];
  addIncome: (income: Omit<Income, "id">) => void;
  deleteIncome: (id: string) => void;
  updateIncome: (income: Income) => void;
};

const IncomeContext = createContext<IncomeContextType | null>(null);

const STORAGE_KEY = "financehub-income";

export function IncomeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [incomes, setIncomes] = useState<Income[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(incomes)
    );
  }, [incomes]);

  function addIncome(income: Omit<Income, "id">) {
    const newIncome: Income = {
      ...income,
      id: crypto.randomUUID(),
    };

    setIncomes((prev) => [...prev, newIncome]);
  }

  function deleteIncome(id: string) {
    setIncomes((prev) =>
      prev.filter((income) => income.id !== id)
    );
  }

  function updateIncome(updatedIncome: Income) {
    setIncomes((prev) =>
      prev.map((income) =>
        income.id === updatedIncome.id
          ? updatedIncome
          : income
      )
    );
  }

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        addIncome,
        deleteIncome,
        updateIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
}

export function useIncome() {
  const context = useContext(IncomeContext);

  if (!context) {
    throw new Error(
      "useIncome must be used inside IncomeProvider"
    );
  }

  return context;
}