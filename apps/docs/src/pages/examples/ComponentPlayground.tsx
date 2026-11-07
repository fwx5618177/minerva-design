import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfigProvider,
  FormField,
  Input,
  ResponsiveGrid,
  Select,
  SelectItem,
  Stack,
  Switch,
} from "minerva-design";
import CodeBlock from "@layout/CodeBlock";
import { useThemeMode } from "@/theme/ThemeModeContext";
import styles from "./playground.module.scss";

type Theme = "light" | "dark";
type Settings = {
  palette: "minerva" | "tech" | "editorial" | "graphite" | "cool";
  radius: "none" | "small" | "medium" | "large";
  density: "compact" | "standard" | "comfortable";
  variant: "solid" | "outline" | "ghost";
  disabled: boolean;
};
const defaults: Settings = {
  palette: "minerva",
  radius: "medium",
  density: "standard",
  variant: "solid",
  disabled: false,
};
const choices = [
  {
    key: "palette",
    values: ["minerva", "tech", "editorial", "graphite", "cool"],
  },
  { key: "variant", values: ["solid", "outline", "ghost"] },
  { key: "density", values: ["compact", "standard", "comfortable"] },
  { key: "radius", values: ["none", "small", "medium", "large"] },
] as const;

/** Every setting updates the real provider or a public component prop. */
export default function ComponentPlayground() {
  const { t } = useTranslation();
  const text = (key: string) => t(`home.showcase.${key}`);
  const clicks = (value: number | string) =>
    t("home.showcase.clicks", { value });
  // The preview follows the site's light / dark mode until toggled here.
  const { resolved } = useThemeMode();
  const [themeOverride, setThemeOverride] = useState<Theme | null>(null);
  const theme: Theme =
    themeOverride ?? (resolved === "light" ? "light" : "dark");
  const [settings, setSettings] = useState<Settings>(defaults);
  const [name, setName] = useState("Minerva Studio");
  const [notifications, setNotifications] = useState(true);
  const [count, setCount] = useState(0);
  const [showSource, setShowSource] = useState(false);
  const palette = settings.palette === "minerva" ? null : settings.palette;
  const code = `import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, ConfigProvider, FormField, Input, Stack, Switch } from "minerva-design";
import "minerva-design/style.css";

export default function Example() {
  const [name, setName] = useState("Minerva Studio");
  const [notifications, setNotifications] = useState(true);
  const [count, setCount] = useState(0);
  return (
    <ConfigProvider theme="${theme}" palette=${palette === null ? "{null}" : JSON.stringify(palette)} density="${settings.density}" radius="${settings.radius}">
      <Card variant="outline" padding="large">
        <CardHeader>
          <CardTitle>{name || ${JSON.stringify(text("previewTitle"))}}</CardTitle>
          <CardDescription>${text("previewDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap={4}>
            <FormField label=${JSON.stringify(text("name"))}>
              <Input value={name} onChange={(event) => setName(event.target.value)} />
            </FormField>
            <Switch label=${JSON.stringify(text("notifications"))} checked={notifications} onChange={setNotifications} />
            <CardDescription>{notifications ? ${JSON.stringify(text("enabled"))} : ${JSON.stringify(text("disabled"))}}</CardDescription>
            <Button variant="${settings.variant}" disabled={${settings.disabled}} onClick={() => setCount((value) => value + 1)}>${text("tryButton")}</Button>
            <output aria-live="polite">${clicks("{count}")}</output>
          </Stack>
        </CardContent>
      </Card>
    </ConfigProvider>
  );
}`;
  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <h2>{text("title")}</h2>
        <p>{text("description")}</p>
      </div>
      <div className={styles.workbench}>
        <Stack gap={4} className={styles.controls}>
          <Switch
            label={text("darkMode")}
            checked={theme === "dark"}
            onChange={(dark) => setThemeOverride(dark ? "dark" : "light")}
          />
          <ResponsiveGrid columns={2} gap={4}>
            {choices.map(({ key, values }) => (
              <FormField key={key} label={text(key)}>
                <Select
                  value={settings[key]}
                  onChange={(value) =>
                    setSettings((s) => ({ ...s, [key]: value }))
                  }
                >
                  {values.map((value) => (
                    <SelectItem key={value} value={value}>
                      {text(`options.${value}`)}
                    </SelectItem>
                  ))}
                </Select>
              </FormField>
            ))}
          </ResponsiveGrid>
          <Switch
            label={text("disableButton")}
            checked={settings.disabled}
            onChange={(disabled) => setSettings((s) => ({ ...s, disabled }))}
          />
          <div className={styles.actions}>
            <Button
              variant="outline"
              color="neutral"
              size="small"
              aria-expanded={showSource}
              aria-controls="playground-source"
              onClick={() => setShowSource(!showSource)}
            >
              {text(showSource ? "hideCode" : "showCode")}
            </Button>
            <Button
              variant="ghost"
              color="neutral"
              size="small"
              onClick={() => {
                setThemeOverride(null);
                setSettings(defaults);
                setName("Minerva Studio");
                setNotifications(true);
                setCount(0);
              }}
            >
              {text("reset")}
            </Button>
          </div>
        </Stack>
        <ConfigProvider
          theme={theme}
          palette={palette}
          density={settings.density}
          radius={settings.radius}
        >
          <div
            className={styles.preview}
            data-testid="playground-preview"
            data-demo-preview
          >
            <Card variant="outline" padding="large">
              <CardHeader>
                <CardTitle>{name || text("previewTitle")}</CardTitle>
                <CardDescription>{text("previewDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <FormField label={text("name")}>
                    <Input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </FormField>
                  <Switch
                    label={text("notifications")}
                    checked={notifications}
                    onChange={setNotifications}
                  />
                  <CardDescription>
                    {notifications ? text("enabled") : text("disabled")}
                  </CardDescription>
                  <Button
                    variant={settings.variant}
                    disabled={settings.disabled}
                    onClick={() => setCount((value) => value + 1)}
                  >
                    {text("tryButton")}
                  </Button>
                  <output aria-live="polite">{clicks(count)}</output>
                </Stack>
              </CardContent>
            </Card>
          </div>
        </ConfigProvider>
      </div>
      {showSource && (
        <div id="playground-source" className={styles.source}>
          <CodeBlock code={code} language="tsx" />
        </div>
      )}
    </div>
  );
}
