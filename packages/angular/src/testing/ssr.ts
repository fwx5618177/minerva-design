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
import {
  provideServerRendering,
  renderApplication,
  ɵENABLE_DOM_EMULATION as ENABLE_DOM_EMULATION,
} from "@angular/platform-server";

/** Element name of a (selector-less test host) component */
export const hostTag = (component: Type<unknown>) =>
  reflectComponentType(component)?.selector || "ng-component";

/** A detached document (domino's `serialize()` added) for the server render */
function serverDocument(tag: string): Document {
  const doc = document.implementation.createHTMLDocument("");
  doc.body.innerHTML = `<${tag}></${tag}>`;
  Object.assign(doc, {
    serialize: () => `<!DOCTYPE html>${doc.documentElement.outerHTML}`,
  });
  return doc;
}

/** Server-renders a standalone component (zoneless, hydration annotations) */
export async function renderToString(
  component: Type<unknown>,
  providers: Array<Provider | EnvironmentProviders> = [],
): Promise<string> {
  const tag = hostTag(component);
  return render(component, tag, providers);
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
      document: serverDocument(tag),
      url: "http://localhost/",
      allowedHosts: ["localhost"],
      // no domino globals over the test environment's DOM: the server
      // render uses a separate happy-dom document (the published package is
      // server-rendered in plain Node, with domino, by test:dist)
      platformProviders: [{ provide: ENABLE_DOM_EMULATION, useValue: false }],
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
