// Every authored template is compiled by ngc before Vite builds the site.
import { createComponent, provideZonelessChangeDetection } from "@angular/core";
import { createApplication } from "@angular/platform-browser";
import * as minerva from "minerva-design/angular";
import type { AngularExample } from "./examples";
import { compiledExamples } from "./.aot/examples.js";

export interface AngularSettings {
  theme: minerva.ConfigTheme;
  palette: Parameters<minerva.MinervaScope["setPalette"]>[0];
  language: "en" | "zh";
}
export interface AngularIsland {
  update(settings: AngularSettings): void;
  destroy(): void;
}
export async function mountAngularExample(
  root: HTMLElement,
  example: AngularExample,
  settings: AngularSettings,
  callbacks: {
    theme: (theme: minerva.ConfigTheme) => void;
    palette: (palette: AngularSettings["palette"]) => void;
  },
): Promise<AngularIsland> {
  const componentType = compiledExamples[example.key ?? ""];
  if (!componentType)
    throw new Error(`Missing compiled Angular example: ${example.key}`);
  let engine: typeof import("monaco-editor") | undefined;
  if (example.monaco) {
    engine = (await import("../pages/monaco-code-editor/engine")).monaco;
  }
  const app = await createApplication({
    providers: [
      provideZonelessChangeDetection(),
      minerva.provideEmbeddedMinerva(),
    ],
  });
  const host = document.createElement("mn-docs-example");
  root.appendChild(host);
  try {
    const component = createComponent(componentType, {
      environmentInjector: app.injector,
      hostElement: host,
    });
    component.instance.theme.set(settings.theme);
    component.instance.palette.set(settings.palette);
    component.instance.language.set(settings.language);
    component.instance.onTheme = callbacks.theme;
    component.instance.onPalette = callbacks.palette;
    component.instance.monaco = engine;
    app.attachView(component.hostView);
    app.tick();
    await app.whenStable();
    let destroyed = false;
    return {
      update(next) {
        if (destroyed) return;
        component.instance.theme.set(next.theme);
        component.instance.palette.set(next.palette);
        component.instance.language.set(next.language);
      },
      destroy() {
        if (destroyed) return;
        destroyed = true;
        component.destroy();
        app.destroy();
        host.remove();
      },
    };
  } catch (error) {
    app.destroy();
    host.remove();
    throw error;
  }
}
