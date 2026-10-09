// App-level settings that MinervaProvider takes as props (language, preset):
// held in App's state and exposed to the screens through this context.
import { createContext, useContext } from "react";
import type { MinervaProviderProps, NativeLocale } from "minerva-design/native";

export type Language = NonNullable<NativeLocale["language"]>;
export type Preset = NonNullable<MinervaProviderProps["preset"]>;
export type Palette = NonNullable<MinervaProviderProps["palette"]>;

export const LANGUAGES: readonly { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "fr", label: "Français" },
];

export interface AppSettings {
  language: Language;
  setLanguage: (language: Language) => void;
  preset: Preset;
  setPreset: (preset: Preset) => void;
}

export const SettingsContext = createContext<AppSettings | null>(null);

export function useSettings(): AppSettings {
  const value = useContext(SettingsContext);
  if (!value) throw new Error("useSettings must be used inside App");
  return value;
}
