// Theming: color mode, palette, design preset, built-in text language and a
// live preview of the resolved tokens (useTheme).
import { Text, View } from "react-native";
import {
  Button,
  Pagination,
  PaletteToggle,
  PresetToggle,
  Tabs,
  ThemeToggle,
  useI18n,
  useTheme,
} from "minerva-design/native";
import { LANGUAGES, useSettings, type Language } from "../settings";
import { Paragraph, Row, Screen, Section } from "../ui";

const SWATCHES = [
  "primary-color",
  "success-color",
  "warning-color",
  "danger-color",
  "info-color",
  "canvas-color",
  "surface-color",
  "surface-muted-color",
  "border-color",
  "text-color",
  "text-secondary-color",
  "text-muted-color",
] as const;

function Swatches() {
  const { colors, tokens } = useTheme();
  return (
    <View
      style={{ flexDirection: "row", flexWrap: "wrap", gap: tokens.space["3"] }}
    >
      {SWATCHES.map((name) => (
        <View key={name} style={{ width: 96, gap: tokens.space["1"] }}>
          <View
            style={{
              height: 48,
              borderRadius: tokens.radius.md,
              backgroundColor: colors[name],
              borderWidth: 1,
              borderColor: colors["border-color"],
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              color: colors["text-color"],
              fontSize: tokens.fontSize.xs,
            }}
          >
            {name.replace(/-color$/, "")}
          </Text>
          <Text
            style={{
              color: colors["text-muted-color"],
              fontSize: tokens.fontSize.xs,
            }}
          >
            {colors[name]}
          </Text>
        </View>
      ))}
    </View>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useSettings();
  return (
    <Tabs
      variant="pills"
      value={language}
      onChange={(v) => setLanguage(v as Language)}
      items={LANGUAGES.map((l) => ({ value: l.value, label: l.label }))}
      listLabel="Language"
    />
  );
}

/** Theme controls, shared by the Theming screen and the home "Theme" tab */
export function ThemingContent() {
  const { tokens, mode, design } = useTheme();
  const { t, language } = useI18n();
  const { setPreset } = useSettings();
  return (
    <View style={{ gap: tokens.space["8"] }}>
      <Section
        title="ThemeToggle"
        description={`Light, dark or follow the system. Applied: ${mode}.`}
      >
        <ThemeToggle showSystem />
      </Section>
      <Section
        title="PaletteToggle"
        description="Built-in brand palettes over the same components."
      >
        <PaletteToggle showDefault />
      </Section>
      <Section
        title="PresetToggle"
        description={`Density, radius, shadows and type scale. Current: ${design.preset}.`}
      >
        <PresetToggle onChange={setPreset} />
      </Section>
      <Section
        title="Locale"
        description="Language of the built-in texts (close, cancel, pagination, validation...)."
      >
        <LanguageSwitcher />
        <Paragraph muted>
          {`"common.loading" in ${language}: ${t("common.loading")}`}
        </Paragraph>
        <Pagination total={120} pageSize={10} simple />
      </Section>
      <Section
        title="Tokens"
        description="useTheme().colors, resolved for the current mode and palette."
      >
        <Swatches />
        <Row>
          <Button size="small">Primary</Button>
          <Button size="small" variant="outline">
            Outline
          </Button>
          <Button size="small" variant="ghost">
            Ghost
          </Button>
        </Row>
      </Section>
    </View>
  );
}

export function ThemingScreen() {
  return (
    <Screen title="Theming">
      <ThemingContent />
    </Screen>
  );
}
