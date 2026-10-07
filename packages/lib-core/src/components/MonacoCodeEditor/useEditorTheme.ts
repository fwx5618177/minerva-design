import { useContext, useSyncExternalStore } from "react";
import { ConfigContext } from "../../contexts/ConfigProvider";
import type { MonacoCodeEditorTheme } from "./types";

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

const getSnapshot = () => document.documentElement.dataset.theme ?? null;
const getServerSnapshot = () => null;

const asMode = (value: unknown): MonacoCodeEditorTheme | undefined => {
  if (value === "dark" || value === "github-dark") return "dark";
  if (value === "light") return "light";
  return undefined;
};

/**
 * Theme of the editor: the explicit prop, else the resolved page theme
 * (`data-theme` on `<html>`, written by the theme utilities / ThemeProvider),
 * else the ConfigProvider theme, else light. Follows changes live.
 */
export function useEditorTheme(
  theme: MonacoCodeEditorTheme | undefined,
): MonacoCodeEditorTheme {
  const config = useContext(ConfigContext);
  const documentTheme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return (
    theme ?? asMode(documentTheme) ?? asMode(config?.resolvedTheme) ?? "light"
  );
}
