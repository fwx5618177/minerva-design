import type { Plugin } from "vite";
import {
  angularLinker,
  compileAngularExamples,
} from "../../../../../packages/angular/scripts/docs-aot.mjs";

/** Build-time compilation and APF linking; no compiler ships to the browser. */
export function angularExamplesPlugin(): Plugin {
  let link: Awaited<ReturnType<typeof angularLinker>>;
  return {
    name: "minerva-angular-aot-examples",
    enforce: "pre",
    async buildStart() {
      await compileAngularExamples();
      link = await angularLinker();
    },
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (
          chunk.type === "chunk" &&
          Object.keys(chunk.modules).some((id) =>
            /[\\/]@angular[\\/]compiler[\\/]/.test(id),
          )
        ) {
          this.error(
            "Angular examples must use AOT: the browser bundle contains @angular/compiler",
          );
        }
      }
    },
    async handleHotUpdate({ file, server }) {
      if (file.endsWith("/angular/examples.ts")) {
        await compileAngularExamples();
        server.ws.send({ type: "full-reload" });
        return [];
      }
    },
    async transform(code, id) {
      return link?.(code, id);
    },
    config(_config, { command }) {
      return {
        define: {
          ngJitMode: "false",
          ngI18nClosureMode: "false",
          ...(command === "build" ? { ngDevMode: "false" } : {}),
        },
        // The dependency optimizer otherwise bypasses Vite's linker transform.
        optimizeDeps: {
          exclude: [
            "@angular/core",
            "@angular/common",
            "@angular/forms",
            "@angular/platform-browser",
            "minerva-design/angular",
            "minerva-design/angular/monaco",
          ],
        },
      };
    },
  };
}
