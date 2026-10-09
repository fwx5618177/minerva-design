import { DocumentPreviewScreen } from "./screens/DocumentPreviewScreen";
import { AdvancedScreen } from "./screens/AdvancedScreen";
import { VirtualListScreen } from "./screens/VirtualListScreen";
import { useMemo, useState, type ComponentType } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  MinervaProvider,
  ToastProvider,
  useTheme,
  type MinervaTheme,
} from "minerva-design/native";
import { NavigationProvider, useNavigation, type Route } from "./navigation";
import {
  SettingsContext,
  type AppSettings,
  type Language,
  type Palette,
  type Preset,
} from "./settings";
import { HomeScreen } from "./screens/HomeScreen";
import { GeneralScreen } from "./screens/GeneralScreen";
import { FormsScreen } from "./screens/FormsScreen";
import { FeedbackScreen } from "./screens/FeedbackScreen";
import { OverlaysScreen } from "./screens/OverlaysScreen";
import { NavigationScreen } from "./screens/NavigationScreen";
import { DataDisplayScreen } from "./screens/DataDisplayScreen";
import { MobileScreen } from "./screens/MobileScreen";
import { ThemingScreen } from "./screens/ThemingScreen";

const SCREENS: Record<Route, ComponentType> = {
  home: HomeScreen,
  advanced: AdvancedScreen,
  "document-preview": DocumentPreviewScreen,
  "virtual-list": VirtualListScreen,
  general: GeneralScreen,
  forms: FormsScreen,
  feedback: FeedbackScreen,
  overlays: OverlaysScreen,
  navigation: NavigationScreen,
  data: DataDisplayScreen,
  mobile: MobileScreen,
  theming: ThemingScreen,
};

function CurrentScreen() {
  const { route } = useNavigation();
  const { mode } = useTheme();
  const Component = SCREENS[route];
  return (
    <>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
      <Component />
    </>
  );
}

function Root() {
  const insets = useSafeAreaInsets();
  const [themeMode, setThemeMode] =
    useState<MinervaTheme["themeMode"]>("system");
  const [palette, setPalette] = useState<Palette | null>(null);
  const [preset, setPreset] = useState<Preset>("touch");
  const [language, setLanguage] = useState<Language>("en");

  const settings = useMemo<AppSettings>(
    () => ({ language, setLanguage, preset, setPreset }),
    [language, preset],
  );
  const locale = useMemo(() => ({ language }), [language]);

  return (
    <SettingsContext.Provider value={settings}>
      <MinervaProvider
        theme={themeMode}
        onThemeChange={setThemeMode}
        palette={palette}
        onPaletteChange={setPalette}
        preset={preset}
        locale={locale}
        insets={insets}
      >
        <ToastProvider position="top">
          <NavigationProvider>
            <CurrentScreen />
          </NavigationProvider>
        </ToastProvider>
      </MinervaProvider>
    </SettingsContext.Provider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}
