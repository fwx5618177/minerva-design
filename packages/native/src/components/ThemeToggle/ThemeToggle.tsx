import { useMemo } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import {
  DESIGN_PRESETS,
  PALETTES,
  resolveTokens,
  type DesignPreset,
  type Palette,
  type ThemeMode,
} from "@minerva/core";
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { part } from "../../internal/parts";
import { Icon } from "../../internal/Icon";
import { hitSlopFor, shadowStyle, weight } from "../../internal/styles";

export type ThemeToggleSize = "small" | "medium";

interface SegmentedOption<V extends string> {
  value: V;
  label: string;
}

interface SegmentedProps<V extends string> {
  component: string;
  groupLabel: string;
  options: readonly SegmentedOption<V>[];
  value: V | undefined;
  onSelect: (value: V) => void;
  size: ThemeToggleSize;
  disabled: boolean;
  style?: StyleProp<ViewStyle>;
  rest: object;
}

/** iOS-style segmented control: a radio group of equal-width segments */
function Segmented<V extends string>({
  component,
  groupLabel,
  options,
  value,
  onSelect,
  size,
  disabled,
  style,
  rest,
}: SegmentedProps<V>) {
  const { tokens: t, fonts } = useTheme();
  const height =
    t.sizes[size === "small" ? "control-height-xs" : "control-height-sm"];
  return (
    <View
      role="radiogroup"
      accessibilityLabel={groupLabel}
      {...part(component, "root", { size, disabled })}
      {...rest}
      style={[
        {
          flexDirection: "row",
          alignSelf: "flex-start",
          padding: t.space["0-5"],
          gap: t.space["0-5"],
          borderRadius: t.radius.lg,
          backgroundColor: t.colors["surface-muted-color"],
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ checked, disabled }}
            aria-checked={checked}
            aria-disabled={disabled}
            disabled={disabled}
            onPress={() => {
              if (!checked) onSelect(option.value);
            }}
            hitSlop={hitSlopFor(t, height)}
            {...part(component, "option", { value: option.value, checked })}
            style={({ pressed }) => ({
              minHeight: height,
              minWidth: height * 1.6,
              paddingHorizontal: t.space["3"],
              borderRadius: t.radius.md,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: checked
                ? t.colors["surface-color"]
                : pressed
                  ? t.colors["hover-color"]
                  : "transparent",
              ...(checked ? shadowStyle(t.shadows.sm) : null),
            })}
          >
            <Text
              numberOfLines={1}
              style={{
                color: checked
                  ? t.colors["text-color"]
                  : t.colors["text-secondary-color"],
                fontSize: size === "small" ? t.fontSize.xs : t.fontSize.sm,
                fontWeight: weight(t, checked ? "semibold" : "medium"),
                ...(fonts.sans ? { fontFamily: fonts.sans } : null),
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

interface ToggleBaseProps extends Omit<ViewProps, "style" | "children"> {
  /**
   * Control size
   * @default "medium"
   */
  size?: ThemeToggleSize;
  /**
   * Disables the control
   * @default false
   */
  disabled?: boolean;
  /** Style of the group */
  style?: StyleProp<ViewStyle>;
}

export interface ThemeToggleProps extends ToggleBaseProps {
  /**
   * Show the "system" (follow the OS) option
   * @default true
   */
  showSystem?: boolean;
  /** Override the option labels (defaults are localized) */
  labels?: Partial<Record<ThemeMode, string>>;
  /** Called with the chosen mode (after `setThemeMode`) */
  onChange?: (value: ThemeMode) => void;
}

/**
 * ThemeToggle: a segmented control choosing the color mode (light / dark /
 * system) of the closest MinervaProvider (`useTheme().setThemeMode`).
 */
export function ThemeToggle({
  showSystem = true,
  labels,
  onChange,
  size = "medium",
  disabled = false,
  style,
  accessibilityLabel,
  ...rest
}: ThemeToggleProps) {
  const { themeMode, setThemeMode } = useTheme();
  const { t } = useI18n();
  const modes: ThemeMode[] = showSystem
    ? ["light", "dark", "system"]
    : ["light", "dark"];
  const label = (mode: ThemeMode) => labels?.[mode] ?? t(`themeToggle.${mode}`);
  return (
    <Segmented
      component="theme-toggle"
      groupLabel={
        accessibilityLabel ??
        t("themeToggle.label", { theme: label(themeMode) })
      }
      options={modes.map((mode) => ({ value: mode, label: label(mode) }))}
      value={themeMode}
      onSelect={(mode) => {
        setThemeMode(mode);
        onChange?.(mode);
      }}
      size={size}
      disabled={disabled}
      style={style}
      rest={rest}
    />
  );
}

/** A palette choice: a built-in palette or `"default"` (no palette) */
export type PaletteToggleValue = Palette | "default";

export interface PaletteToggleProps extends ToggleBaseProps {
  /** Palettes offered, in order @default every built-in palette */
  palettes?: readonly Palette[];
  /**
   * Also offer Minerva's default look (no palette) as the first option
   * @default false
   */
  showDefault?: boolean;
  /** Override the option labels (`default` labels the no-palette option) */
  labels?: Partial<Record<PaletteToggleValue, string>>;
  /** Called with the chosen palette (`"default"`: no palette) */
  onChange?: (value: PaletteToggleValue) => void;
}

/**
 * PaletteToggle: color swatches choosing the palette of the closest
 * MinervaProvider (`useTheme().setPalette`); each swatch shows the
 * palette's primary color in the current mode.
 */
export function PaletteToggle({
  palettes = PALETTES,
  showDefault = false,
  labels,
  onChange,
  size = "medium",
  disabled = false,
  style,
  accessibilityLabel,
  ...rest
}: PaletteToggleProps) {
  const { tokens: t, mode, palette, design, setPalette, fonts } = useTheme();
  const { t: tr } = useI18n();
  const values: PaletteToggleValue[] = showDefault
    ? ["default", ...palettes]
    : [...palettes];
  const current: PaletteToggleValue = palette ?? "default";
  const label = (value: PaletteToggleValue) =>
    labels?.[value] ?? tr(`paletteToggle.${value}`);
  // primary color of each palette, resolved in the current mode
  const key = values.join(",");
  const swatches = useMemo(() => {
    const out: Partial<Record<PaletteToggleValue, string>> = {};
    for (const value of key.split(",") as PaletteToggleValue[]) {
      out[value] = resolveTokens({
        mode,
        palette: value === "default" ? null : value,
        design,
      }).colors["primary-color"];
    }
    return out;
  }, [mode, design, key]);
  const dot = size === "small" ? t.space["6"] : t.space["8"];

  return (
    <View
      role="radiogroup"
      accessibilityLabel={
        accessibilityLabel ??
        tr("paletteToggle.label", { palette: label(current) })
      }
      {...part("palette-toggle", "root", { size, disabled })}
      {...rest}
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: t.space["3"],
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {values.map((value) => {
        const checked = value === current;
        return (
          <Pressable
            key={value}
            accessibilityRole="radio"
            accessibilityLabel={label(value)}
            accessibilityState={{ checked, disabled }}
            aria-checked={checked}
            aria-disabled={disabled}
            disabled={disabled}
            onPress={() => {
              if (checked) return;
              setPalette(value === "default" ? null : value);
              onChange?.(value);
            }}
            hitSlop={hitSlopFor(t, dot, dot)}
            {...part("palette-toggle", "option", { value, checked })}
            style={({ pressed }) => ({
              alignItems: "center",
              gap: t.space["1"],
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <View
              {...part("palette-toggle", "swatch")}
              style={{
                width: dot + t.space["1"] * 2,
                height: dot + t.space["1"] * 2,
                borderRadius: t.radius.full,
                borderWidth: 2,
                borderColor: checked ? swatches[value] : "transparent",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: dot,
                  height: dot,
                  borderRadius: t.radius.full,
                  backgroundColor: swatches[value],
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {checked ? (
                  <Icon
                    name="check"
                    size={Math.round(dot * 0.5)}
                    color={t.colors["text-inverse-color"]}
                  />
                ) : null}
              </View>
            </View>
            <Text
              style={{
                color: checked
                  ? t.colors["text-color"]
                  : t.colors["text-secondary-color"],
                fontSize: t.fontSize.xs,
                fontWeight: weight(t, checked ? "semibold" : "regular"),
                ...(fonts.sans ? { fontFamily: fonts.sans } : null),
              }}
            >
              {label(value)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export interface PresetToggleProps extends ToggleBaseProps {
  /** Presets offered, in order @default every built-in preset */
  presets?: readonly DesignPreset[];
  /** Override the option labels */
  labels?: Partial<Record<DesignPreset, string>>;
  /** Called with the chosen preset (after `setPreset`) */
  onChange?: (value: DesignPreset) => void;
}

/**
 * PresetToggle (native-only): a segmented control choosing the design
 * preset (minerva / editorial / compact / touch) of the closest
 * MinervaProvider (`useTheme().setPreset`).
 */
export function PresetToggle({
  presets = DESIGN_PRESETS,
  labels,
  onChange,
  size = "medium",
  disabled = false,
  style,
  accessibilityLabel,
  ...rest
}: PresetToggleProps) {
  const { design, setPreset } = useTheme();
  const { t } = useI18n();
  const label = (preset: DesignPreset) =>
    labels?.[preset] ?? t(`presetToggle.${preset}`);
  return (
    <Segmented
      component="preset-toggle"
      groupLabel={
        accessibilityLabel ??
        t("presetToggle.label", { preset: label(design.preset) })
      }
      options={presets.map((preset) => ({
        value: preset,
        label: label(preset),
      }))}
      value={design.preset}
      onSelect={(preset) => {
        setPreset(preset);
        onChange?.(preset);
      }}
      size={size}
      disabled={disabled}
      style={style}
      rest={rest}
    />
  );
}
