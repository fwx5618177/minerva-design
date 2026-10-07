import React, { createContext, useContext, useMemo } from "react";
import type { ConfigContextProps, ConfigContextProviderProps } from "./types";
import useAutoTheme from "../hooks/useAutoTheme";
import useLocale from "../hooks/useLocale";
import { DEFAULT_LANGUAGE } from "../config/i18n";
import { resolveTheme } from "../utils/applyThemeStyles";

export const ConfigContext = createContext<ConfigContextProps | undefined>(
  undefined,
);

export const useConfig = (): ConfigContextProps => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

export const ConfigProvider: React.FC<ConfigContextProviderProps> = ({
  theme = "auto",
  locale,
  children,
}) => {
  const [currentTheme, , systemTheme] = useAutoTheme(theme);
  const [currentLocale] = useLocale(locale ?? { language: DEFAULT_LANGUAGE });

  const value = useMemo<ConfigContextProps>(
    () => ({
      theme: currentTheme,
      resolvedTheme:
        currentTheme === "auto"
          ? systemTheme
          : typeof currentTheme === "string"
            ? currentTheme
            : resolveTheme(currentTheme, systemTheme),
      locale: currentLocale,
    }),
    [currentTheme, systemTheme, currentLocale],
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};
