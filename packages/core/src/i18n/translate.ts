// A tiny, framework-agnostic translator for Minerva's message bundles:
// nested keys ("a.b.c"), `{{name}}` interpolation, plurals selected by `count`
// through `Intl.PluralRules` (`key_one`, `key_other`, ...), and fallbacks
// (base language -> fallback language -> `defaultValue` -> the key itself).
// Pure functions only: no DOM access and nothing mutated at import time.
import type { Messages } from "./merge";

/** Options of a single translation */
export type TranslateOptions = {
  /** Selects the plural form (`key_one`, `key_other`...) and fills `{{count}}` */
  count?: number;
  /** Returned (interpolated) when the key is missing in every language */
  defaultValue?: string;
  /** Interpolation values (`{{name}}`) */
  [name: string]: unknown;
};

/** Translates `key` (dot-separated path into the message tree) */
export type TranslateFunction = (
  key: string,
  options?: TranslateOptions,
) => string;

export interface TranslatorConfig {
  /** Message tree per language */
  messages: Readonly<Partial<Record<string, Messages>>>;
  /** Language to translate to (e.g. "fr", "en-US") */
  language: string;
  /** Language used for keys missing in `language` (default "en") */
  fallbackLanguage?: string;
}

const DEFAULT_FALLBACK_LANGUAGE = "en";

const hasOwn = (object: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, key);

// Plural rules are costly to build: one instance per language, created lazily.
const pluralRulesCache = new Map<string, Intl.PluralRules | null>();

const getPluralRules = (language: string): Intl.PluralRules | null => {
  let rules = pluralRulesCache.get(language);
  if (rules === undefined) {
    try {
      rules = new Intl.PluralRules(language);
    } catch {
      // Invalid language tag
      rules = null;
    }
    pluralRulesCache.set(language, rules);
  }
  return rules;
};

/**
 * CLDR plural category of `count` in `language` ("zero", "one", "two", "few",
 * "many" or "other"). Unknown / invalid languages give "other".
 */
export const getPluralCategory = (
  language: string,
  count: number,
): Intl.LDMLPluralRule => getPluralRules(language)?.select(count) ?? "other";

/** Message string at the dot-separated `key` of `tree`, if any */
const lookup = (
  tree: Messages | undefined,
  key: string,
): string | undefined => {
  let node: Messages | string | undefined = tree;
  for (const part of key.split(".")) {
    if (typeof node !== "object" || !hasOwn(node, part)) {
      return undefined;
    }
    node = node[part];
  }
  return typeof node === "string" ? node : undefined;
};

/** Value at the (possibly dotted) interpolation `path` of `values` */
const readValue = (values: Record<string, unknown>, path: string): unknown => {
  if (hasOwn(values, path)) return values[path];
  let node: unknown = values;
  for (const part of path.split(".")) {
    if (typeof node !== "object" || node === null || !hasOwn(node, part)) {
      return undefined;
    }
    node = (node as Record<string, unknown>)[part];
  }
  return node;
};

const PLACEHOLDER = /\{\{\s*([\w.-]+)\s*\}\}/g;

/**
 * Replaces `{{name}}` placeholders of `template` with `values`. Placeholders
 * without a value are kept as is. No HTML escaping (renderers escape).
 */
export const interpolate = (
  template: string,
  values: Record<string, unknown> = {},
): string =>
  template.replace(PLACEHOLDER, (match, path: string) => {
    const value = readValue(values, path);
    return value === undefined || value === null ? match : String(value);
  });

/** Languages to look a key up in: "fr-CA" -> ["fr-CA", "fr", fallback] */
const languageChain = (language: string, fallbackLanguage: string) => {
  const chain = [language];
  const base = language.split("-")[0];
  if (base) chain.push(base);
  chain.push(fallbackLanguage);
  return [...new Set(chain)];
};

/** Translates `key` with the given configuration (see `createTranslator`). */
export const translate = (
  {
    messages,
    language,
    fallbackLanguage = DEFAULT_FALLBACK_LANGUAGE,
  }: TranslatorConfig,
  key: string,
  options: TranslateOptions = {},
): string => {
  const { count, defaultValue } = options;
  for (const lng of languageChain(language, fallbackLanguage)) {
    const tree = messages[lng];
    if (!tree) continue;
    const message =
      (typeof count === "number"
        ? lookup(tree, `${key}_${getPluralCategory(lng, count)}`)
        : undefined) ?? lookup(tree, key);
    if (message !== undefined) return interpolate(message, options);
  }
  return defaultValue !== undefined ? interpolate(defaultValue, options) : key;
};

/**
 * Creates a translate function bound to `messages` and `language`.
 *
 * @example
 * const t = createTranslator({ messages, language: "fr" });
 * t("pagination.page", { page: 2 }); // "Page 2"
 * t("monthCalendar.dayWithEvents", { date, count: 3 }); // uses `_other`
 */
export const createTranslator = (
  config: TranslatorConfig,
): TranslateFunction => {
  const resolved = { ...config };
  return (key, options) => translate(resolved, key, options);
};
