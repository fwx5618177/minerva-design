import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import styles from "./playground.module.scss";

type Settings = {
  theme: "light" | "dark";
  palette: "minerva" | "tech" | "editorial" | "graphite" | "cool";
  radius: "none" | "small" | "medium" | "large";
  density: "compact" | "standard" | "comfortable";
  variant: "solid" | "outline" | "ghost";
  disabled: boolean;
};
const defaults: Settings = {
  theme: "light",
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
    <ConfigProvider theme="${settings.theme}" palette=${palette === null ? "{null}" : JSON.stringify(palette)} density="${settings.density}" radius="${settings.radius}">
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
            <output aria-live="polite">${text("clicks")}: {count}</output>
          </Stack>
        </CardContent>
      </Card>
    </ConfigProvider>
  );
}`;
  return (
    <Card variant="outline" padding="large" className={styles.playground}>
      <CardHeader>
        <CardTitle as="h2">{text("title")}</CardTitle>
        <CardDescription>{text("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.workbench}>
          <Stack gap={4} className={styles.controls}>
            <Switch
              label={text("darkMode")}
              checked={settings.theme === "dark"}
              onChange={(dark) =>
                setSettings((s) => ({ ...s, theme: dark ? "dark" : "light" }))
              }
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
            <Button
              variant="ghost"
              color="neutral"
              onClick={() => {
                setSettings(defaults);
                setName("Minerva Studio");
                setNotifications(true);
                setCount(0);
              }}
            >
              {text("reset")}
            </Button>
          </Stack>
          <ConfigProvider
            theme={settings.theme}
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
                  <CardDescription>
                    {text("previewDescription")}
                  </CardDescription>
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
                    <output aria-live="polite">
                      {text("clicks")}: {count}
                    </output>
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </ConfigProvider>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          color="neutral"
          aria-expanded={showSource}
          aria-controls="playground-source"
          onClick={() => setShowSource(!showSource)}
        >
          {text(showSource ? "hideCode" : "showCode")}
        </Button>
      </CardFooter>
      {showSource && (
        <div id="playground-source">
          <CodeBlock code={code} language="tsx" />
        </div>
      )}
    </Card>
  );
}
