import { computed, inject, type ComputedRef } from "vue";
import {
  createTranslator,
  messages,
  type TranslateOptions,
} from "@minerva/core";
/** The same message catalog as React, resolved reactively through nested providers. */
export function useI18n() {
  const config = inject<ComputedRef<{ locale?: string; dir?: "ltr" | "rtl" }>>(
    "minerva:config",
    computed(() => ({ locale: "en", dir: "ltr" })),
  );
  const language = computed(() => config.value.locale ?? "en");
  const translator = computed(() =>
    createTranslator({ messages, language: language.value }),
  );
  return {
    language,
    dir: computed(() => config.value.dir ?? "ltr"),
    t: (key: string, options?: TranslateOptions) =>
      translator.value(key, options),
  };
}
