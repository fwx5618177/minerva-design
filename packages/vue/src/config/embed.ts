import { computed, toValue, type App, type MaybeRefOrGetter } from "vue";
import type { SupportedLanguage } from "@minerva/core";
import { THEME_SCOPE_KEY } from "../internal/scope";

/** Options of `provideEmbeddedScope` */
export interface EmbeddedScopeOptions {
  /** Language of the built-in texts of the app (reactive) */
  language?: MaybeRefOrGetter<SupportedLanguage | undefined>;
}

/**
 * Embeds a Vue app in a page whose document theme is owned by someone else
 * (a Vue island inside a React / server-rendered page, micro-frontends):
 * its `ConfigProvider`s behave as nested providers — they never write
 * `<html>` attributes, cookies or the global language, and a provider that
 * sets a theme / palette / design scopes it to its subtree (and its
 * teleported overlays). Call it before `app.mount()`.
 *
 * @example
 * const app = createApp(Island);
 * provideEmbeddedScope(app, { language: "fr" });
 * app.mount(el);
 */
export function provideEmbeddedScope(
  app: App,
  options: EmbeddedScopeOptions = {},
): void {
  app.provide(
    THEME_SCOPE_KEY,
    computed(() => ({
      scoped: false,
      portalContainer: null,
      language: toValue(options.language),
    })),
  );
}
