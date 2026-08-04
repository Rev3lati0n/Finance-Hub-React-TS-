import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SettingsContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;

  notifications: boolean;
  toggleNotifications: () => void;

  currency: string;
  setCurrency: (currency: string) => void;
}

const SettingsContext = createContext<
  SettingsContextType | undefined
>(undefined);

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(
    () =>
      JSON.parse(
        localStorage.getItem("financehub-darkmode") ??
          "false"
      )
  );

  const [notifications, setNotifications] =
    useState(
      () =>
        JSON.parse(
          localStorage.getItem(
            "financehub-notifications"
          ) ?? "true"
        )
    );

  const [currency, setCurrencyState] = useState(
    () =>
      localStorage.getItem(
        "financehub-currency"
      ) ?? "USD"
  );

  useEffect(() => {
    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

    localStorage.setItem(
      "financehub-darkmode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(
      "financehub-notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "financehub-currency",
      currency
    );
  }, [currency]);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,

        toggleDarkMode: () =>
          setDarkMode((v: boolean) => !v),

        notifications,

        toggleNotifications: () =>
          setNotifications((v: boolean) => !v),

        currency,

        setCurrency: setCurrencyState,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error(
      "useSettings must be used inside SettingsProvider."
    );

  return context;
}