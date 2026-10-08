import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  messages,
  translate,
  type SupportedLanguage,
  type TranslateOptions,
} from "@minerva/core";
import { closestComposed } from "./dom";

/**
 * Language of the built-in texts of `el`: the `locale` attribute of the
 * closest `<minerva-config>`, else the closest `lang` attribute (crossing
 * shadow roots), reduced to a supported language ("fr-CA" -> "fr"), else
 * English.
 */
export function resolveLanguage(el: Element): SupportedLanguage {
  const owner = closestComposed(el, "minerva-config[locale], [lang]");
  const value =
    (owner?.localName === "minerva-config"
      ? owner.getAttribute("locale")
      : owner?.getAttribute("lang")) ?? "";
  const base = value.trim().toLowerCase().split("-")[0];
  return isSupportedLanguage(base) ? base : DEFAULT_LANGUAGE;
}

const listeners = new Set<() => void>();
let observer: MutationObserver | null = null;

/** One document-wide observer of `lang` / `locale` changes for every element. */
function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (!observer && typeof MutationObserver !== "undefined") {
    observer = new MutationObserver(() => {
      for (const notify of [...listeners]) notify();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "locale"],
      subtree: true,
    });
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

/**
 * Translations of the built-in texts (core's translator and message
 * bundles), following the language of the host's scope. Re-renders the host
 * when a `lang` / `locale` attribute changes anywhere in the document.
 */
export class LocaleController implements ReactiveController {
  private unsubscribe: (() => void) | null = null;
  private current: SupportedLanguage = DEFAULT_LANGUAGE;

  constructor(private readonly host: ReactiveControllerHost & HTMLElement) {
    host.addController(this);
  }

  /** Current language (resolved on connect and on attribute changes). */
  get language(): SupportedLanguage {
    return this.current;
  }

  /** Translates `key` (e.g. `"modal.close"`) in the current language. */
  t = (key: string, options?: TranslateOptions): string =>
    translate({ messages, language: this.current }, key, options);

  hostConnected(): void {
    this.current = resolveLanguage(this.host);
    this.unsubscribe = subscribe(() => {
      const next = resolveLanguage(this.host);
      if (next !== this.current) {
        this.current = next;
        this.host.requestUpdate();
      }
    });
  }

  hostDisconnected(): void {
    this.unsubscribe?.();
    this.unsubscribe = null;
  }
}
