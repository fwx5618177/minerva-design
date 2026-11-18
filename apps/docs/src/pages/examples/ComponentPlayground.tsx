import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Checkbox,
  CommandDialog,
  DatePicker,
  Tag,
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
import Logo from "@/site/Logo";
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
  const dateRef = useRef<HTMLInputElement>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [date, setDate] = useState("2026-11-25");
  const [checks, setChecks] = useState([true, false, false]);
  const [saved, setSaved] = useState(false);
  const complete = checks.filter(Boolean).length;
  const [showSource, setShowSource] = useState(false);
  const palette = settings.palette === "minerva" ? null : settings.palette;
  const code = `import { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, ConfigProvider, FormField, Input, DatePicker, Checkbox, Stack, Switch } from "minerva-design";
import "minerva-design/style.css";

export default function Example() {
  const [name, setName] = useState("Minerva Studio");
  const [notifications, setNotifications] = useState(true);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState("2026-11-25");
  const [reviewed, setReviewed] = useState(false);
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
            <FormField label=${JSON.stringify(text("releaseDate"))}>
              <DatePicker aria-label=${JSON.stringify(text("releaseDate"))} value={date} onChange={setDate} />
            </FormField>
            <Checkbox label=${JSON.stringify(text("tasks.states"))} checked={reviewed} onChange={setReviewed} />
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
    <div
      className={styles.playground}
      data-home-playground
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          !window.matchMedia(
            "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          ).matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--pointer-x",
          `${event.clientX - rect.left}px`,
        );
        event.currentTarget.style.setProperty(
          "--pointer-y",
          `${event.clientY - rect.top}px`,
        );
      }}
    >
      <div className={styles.header}>
        <h2>{text("title")}</h2>
        <p>{text("description")}</p>
      </div>
      <div className={styles.workbench}>
        <Stack gap={4} className={styles.controls}>
          <div className={styles.controlHeading}>
            <span>01</span>
            <h3>{text("appearance")}</h3>
          </div>
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
                setDate("2026-11-25");
                setChecks([true, false, false]);
                setSaved(false);
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
            <div className={styles.appBar}>
              <div className={styles.workspaceIdentity}>
                <span className={styles.workspaceMark} aria-hidden>
                  <Logo size={24} />
                </span>
                <span>{name || text("previewTitle")}</span>
              </div>
              <Tag size="small" variant="subtle">
                {text("workspace")}
              </Tag>
            </div>
            <div className={styles.commandBar}>
              <Button
                variant="outline"
                color="neutral"
                onClick={() => setCommandOpen(true)}
              >
                <span>{text("search")}</span>
                <kbd>⌘ ⇧ K</kbd>
              </Button>
            </div>
            <Card variant="outline" padding="large">
              <CardHeader>
                <div className={styles.releaseHeading}>
                  <span className={styles.eyebrow}>{text("releasePlan")}</span>
                  <Tag size="small" color={saved ? "success" : "neutral"}>
                    {text(saved ? "saved" : "draft")}
                  </Tag>
                </div>
                <CardTitle>{text("releaseTitle")}</CardTitle>
                <CardDescription>{text("previewDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={4}>
                  <div className={styles.fields}>
                    <FormField label={text("name")}>
                      <Input
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          setSaved(false);
                        }}
                      />
                    </FormField>
                    <FormField label={text("releaseDate")}>
                      <DatePicker
                        ref={dateRef}
                        aria-label={text("releaseDate")}
                        value={date}
                        onChange={(value) => {
                          setDate(value);
                          setSaved(false);
                        }}
                      />
                    </FormField>
                  </div>
                  <div className={styles.checklist}>
                    <div className={styles.checklistHeading}>
                      <h4>{text("readiness")}</h4>
                      <span>
                        {t("home.showcase.complete", { value: complete })}
                      </span>
                    </div>
                    <div className={styles.progressTrack} aria-hidden>
                      <span style={{ width: `${(complete / 3) * 100}%` }} />
                    </div>
                    {["tokens", "states", "guides"].map((key, index) => (
                      <div
                        className={styles.task}
                        key={key}
                        data-complete={checks[index]}
                      >
                        <Checkbox
                          label={text(`tasks.${key}`)}
                          checked={checks[index]}
                          onChange={(checked) => {
                            setChecks((current) =>
                              current.map((value, position) =>
                                position === index ? checked : value,
                              ),
                            );
                            setSaved(false);
                          }}
                        />
                        <span className={styles.taskIndex} aria-hidden>
                          0{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.notificationRow}>
                    <div>
                      <Switch
                        label={text("notifications")}
                        checked={notifications}
                        onChange={(checked) => {
                          setNotifications(checked);
                          setSaved(false);
                        }}
                      />
                      <p>
                        {notifications ? text("enabled") : text("disabled")}
                      </p>
                    </div>
                  </div>
                  <div className={styles.saveRow}>
                    <output aria-live="polite">
                      {saved
                        ? text("savedMessage")
                        : t("home.showcase.unsaved")}
                      {" · "}
                      {clicks(count)}
                    </output>
                    <Button
                      variant={settings.variant}
                      disabled={settings.disabled}
                      onClick={() => {
                        setCount((value) => value + 1);
                        setSaved(true);
                      }}
                    >
                      {text("tryButton")}
                    </Button>
                  </div>
                </Stack>
              </CardContent>
            </Card>
            <CommandDialog
              open={commandOpen}
              onOpenChange={setCommandOpen}
              title={text("commands")}
              placeholder={text("search")}
              shortcut="mod+shift+k"
              shortcutLabel="⌘ ⇧ K"
              items={[
                {
                  id: "schedule",
                  title: text("schedule"),
                  description: text("scheduleDescription"),
                  keywords: "date calendar schedule",
                  group: text("releasePlan"),
                },
                {
                  id: "save",
                  title: text("tryButton"),
                  description: text("saveDescription"),
                  disabled: settings.disabled,
                  group: text("releasePlan"),
                },
                {
                  id: "theme",
                  title: text("toggleTheme"),
                  description: text("themeDescription"),
                  group: text("appearance"),
                },
              ]}
              onSelect={(item) => {
                if (item.id === "schedule")
                  setTimeout(() => dateRef.current?.focus(), 0);
                if (item.id === "save") {
                  setCount((value) => value + 1);
                  setSaved(true);
                }
                if (item.id === "theme")
                  setThemeOverride(theme === "dark" ? "light" : "dark");
              }}
            />
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
