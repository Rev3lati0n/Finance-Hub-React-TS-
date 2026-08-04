import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

interface SettingsContextType {
  notifications: boolean;
  setNotifications: (value: boolean) => void;

  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const SettingsContext =
  createContext<SettingsContextType | undefined>(
    undefined
  );

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] =
    useState(() => {
      const saved = localStorage.getItem(
        "financehub-notifications"
      );

      return saved ? JSON.parse(saved) : true;
    });

  const [darkMode, setDarkMode] = useState(() => {
    const saved =
      localStorage.getItem("financehub-darkmode");

    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      "financehub-notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "financehub-darkmode",
      JSON.stringify(darkMode)
    );

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <SettingsContext.Provider
      value={{
        notifications,
        setNotifications,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}