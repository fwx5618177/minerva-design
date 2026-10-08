// Server rendering and hydration helpers (src/ssr.test.ts,
// src/hydration.test.ts).
import {
  provideZonelessChangeDetection,
  reflectComponentType,
  type ApplicationRef,
  type EnvironmentProviders,
  type Provider,
  type Type,
} from "@angular/core";
import {
  bootstrapApplication,
  provideClientHydration,
  type BootstrapContext,
} from "@angular/platform-browser";
import { ɵBrowserDomAdapter as BrowserDomAdapter } from "@angular/platform-browser";
import {
  provideServerRendering,
  renderApplication,
} from "@angular/platform-server";

/** Element name of a (selector-less test host) component */
export const hostTag = (component: Type<unknown>) =>
  reflectComponentType(component)?.selector || "ng-component";

/** Server-renders a standalone component (zoneless, hydration annotations) */
export async function renderToString(
  component: Type<unknown>,
  providers: Array<Provider | EnvironmentProviders> = [],
): Promise<string> {
  const tag = hostTag(component);
  // the server platform installs domino's DOM globals: restore the test
  // environment's ones afterwards (and the browser DOM adapter)
  const saved = Object.getOwnPropertyDescriptors(globalThis);
  try {
    return await render(component, tag, providers);
  } finally {
    for (const key of Reflect.ownKeys(globalThis)) {
      const before = saved[key as keyof typeof saved];
      if (!before) delete (globalThis as Record<PropertyKey, unknown>)[key];
      else Object.defineProperty(globalThis, key, before);
    }
    BrowserDomAdapter.makeCurrent();
  }
}

function render(
  component: Type<unknown>,
  tag: string,
  providers: Array<Provider | EnvironmentProviders>,
): Promise<string> {
  return renderApplication(
    (context: BootstrapContext) =>
      bootstrapApplication(
        component,
        {
          providers: [
            provideServerRendering(),
            provideZonelessChangeDetection(),
            provideClientHydration(),
            ...providers,
          ],
        },
        context,
      ),
    {
      document: `<!doctype html><html><head></head><body><${tag}></${tag}></body></html>`,
      url: "http://localhost/",
      allowedHosts: ["localhost"],
    },
  );
}

/**
 * Loads server HTML into the test document and hydrates it with a client
 * application; returns the application (destroy it after the test).
 */
export async function hydrate(
  html: string,
  component: Type<unknown>,
  providers: Array<Provider | EnvironmentProviders> = [],
): Promise<ApplicationRef> {
  const part = (tag: string) =>
    new RegExp(`<${tag}[^>]*>([\\s\\S]*)</${tag}>`).exec(html)?.[1] ?? "";
  document.head.innerHTML = part("head");
  document.body.innerHTML = part("body");
  const app = await bootstrapApplication(component, {
    providers: [
      provideZonelessChangeDetection(),
      provideClientHydration(),
      ...providers,
    ],
  });
  await app.whenStable();
  return app;
}
