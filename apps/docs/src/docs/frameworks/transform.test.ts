import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { format } from "prettier";
import { describe, expect, it } from "vitest";
import { parseHtml, walkElements, VOID_ELEMENTS } from "./html";
import {
  WC_FRAMEWORKS,
  formatWcSources,
  transformWcDemo,
  type WcDemoInput,
  type WcFrameworkSources,
} from "./transform";
import { readWcFrameworkSources } from "./vitePlugin";

const PAGES = join(__dirname, "../pages");

/** Every Web Component demo of the docs */
const corpus: WcDemoInput[] = readdirSync(PAGES).flatMap((page) => {
  const dir = join(PAGES, page, "wc");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith(".html"))
    .map((file) => {
      const demo = file.replace(/\.html$/, "");
      const script = join(dir, `${demo}.ts`);
      return {
        page,
        demo,
        html: readFileSync(join(dir, file), "utf8"),
        script: existsSync(script) ? readFileSync(script, "utf8") : undefined,
      };
    });
});

const generate = async (input: WcDemoInput) => {
  const errors: string[] = [];
  const { sources, fallbacks } = transformWcDemo(input);
  const formatted = await formatWcSources(sources, format, (fw, error) =>
    errors.push(`${fw}: ${String(error).split("\n")[0]}`),
  );
  return { sources: formatted, fallbacks, errors };
};

/** Syntax errors of TypeScript / TSX / JavaScript code */
const syntaxErrors = (code: string, fileName: string) =>
  (
    ts.transpileModule(code, {
      fileName,
      reportDiagnostics: true,
      compilerOptions: { jsx: ts.JsxEmit.Preserve },
    }).diagnostics ?? []
  ).map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));

const block = (source: string, open: RegExp, close: string) => {
  const match = open.exec(source);
  if (!match) return null;
  const start = match.index + match[0].length;
  return source.slice(start, source.indexOf(close, start));
};

/** Elements left open in a template (void elements excepted) */
const unclosed = (markup: string) =>
  [...walkElements(parseHtml(markup))]
    .filter(
      (el) => !el.closed && !el.selfClosing && !VOID_ELEMENTS.has(el.name),
    )
    .map((el) => el.name);

const MENU: WcDemoInput = {
  page: "menu",
  demo: "basic",
  html: `<minerva-menu id="file-menu">
  <minerva-button slot="trigger">File</minerva-button>
  <minerva-menu-item value="new">New</minerva-menu-item>
</minerva-menu>
<p id="file-result">Nothing yet</p>
`,
  script: `// Selecting an item fires minerva-select.
type Select = CustomEvent<{ value: string }>;

export function setup(root: HTMLElement) {
  const menu = root.querySelector<HTMLElement>("#file-menu")!;
  const result = root.querySelector<HTMLElement>("#file-result")!;
  const onSelect = (event: Event) =>
    (result.textContent = \`Selected: \${(event as Select).detail.value}\`);
  menu.addEventListener("minerva-select", onSelect);
  return () => menu.removeEventListener("minerva-select", onSelect);
}
`,
};

describe("transformWcDemo: rules", () => {
  it("turns listeners into event bindings and text into reactive state", async () => {
    const { sources, fallbacks, errors } = await generate(MENU);
    expect(fallbacks).toEqual({});
    expect(errors).toEqual([]);

    expect(sources.vue).toContain('<script setup lang="ts">');
    expect(sources.vue).toContain('const resultText = ref("Nothing yet");');
    expect(sources.vue).toContain('@minerva-select="onSelect"');
    expect(sources.vue).toContain("{{ resultText }}");
    expect(sources.vue).toContain("resultText.value = `Selected:");

    expect(sources.angular).toContain("schemas: [CUSTOM_ELEMENTS_SCHEMA]");
    expect(sources.angular).toContain('(minerva-select)="onSelect($event)"');
    expect(sources.angular).toContain('resultText = "Nothing yet";');
    expect(sources.angular).toContain("this.resultText = `Selected:");
    expect(sources.angular).toContain("export class MenuBasicComponent {");

    expect(sources.svelte).toContain('let resultText = $state("Nothing yet");');
    expect(sources.svelte).toContain("onminerva-select={onSelect}");
    expect(sources.svelte).toContain("{resultText}");

    expect(sources.solid).toContain(
      'const [resultText, setResultText] = createSignal("Nothing yet");',
    );
    expect(sources.solid).toContain("on:minerva-select={onSelect}");
    expect(sources.solid).toContain("{resultText()}");
    expect(sources.solid).toContain("setResultText(`Selected:");

    expect(sources.html).toContain('<script type="module">');
    expect(sources.html).toContain('document.querySelector("#file-menu")');
    expect(sources.html).not.toMatch(/: HTMLElement|<HTMLElement>|as Select/);
    expect(sources.html).not.toContain("removeEventListener");

    // the template binding replaces the listener and its removal
    for (const fw of ["vue", "angular", "svelte", "solid"] as const) {
      expect(sources[fw]).not.toContain("addEventListener");
      expect(sources[fw]).not.toContain("removeEventListener");
      expect(sources[fw]).not.toContain("querySelector");
      expect(sources[fw]).toContain(
        "// Selecting an item fires minerva-select.",
      );
    }
  });

  it("binds top-level property assignments as properties", async () => {
    const { sources } = await generate({
      page: "table",
      demo: "rows",
      html: `<minerva-data-table id="services"></minerva-data-table>\n`,
      script: `export function setup(root: HTMLElement) {
  const table = root.querySelector<HTMLElement & { rows: unknown[] }>("#services")!;
  table.rows = [{ id: 1 }];
  root.querySelector<HTMLElement & { columns: unknown[] }>("#services")!;
}
`,
    });
    expect(sources.vue).toContain(':rows.prop="tableRows"');
    expect(sources.vue).toContain("const tableRows = [{ id: 1 }];");
    expect(sources.angular).toContain('[rows]="tableRows"');
    expect(sources.svelte).toContain("rows={tableRows}");
    expect(sources.solid).toContain("prop:rows={tableRows}");
  });

  it("keeps element refs for methods and binds the root on a container", async () => {
    const { sources, fallbacks } = await generate({
      page: "modal",
      demo: "close",
      html: `<minerva-modal id="dialog"><button data-close>OK</button></minerva-modal>\n`,
      script: `type Modal = HTMLElement & { hide(): void };
export function setup(root: HTMLElement) {
  const modal = root.querySelector<Modal>("#dialog")!;
  const onClick = (event: Event) => {
    if ((event.target as Element).closest("[data-close]")) modal.hide();
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
`,
    });
    expect(fallbacks).toEqual({});
    expect(sources.vue).toContain("const modal = ref<Modal>();");
    expect(sources.vue).toContain('ref="modal"');
    expect(sources.vue).toContain("modal.value!.hide()");
    expect(sources.vue).toMatch(/<div ref="root" @click="onClick">/);
    expect(sources.angular).toContain(
      '@ViewChild("modal") modal!: ElementRef<Modal>;',
    );
    expect(sources.angular).toContain("this.modal.nativeElement.hide()");
    expect(sources.angular).toContain('(click)="onClick($event)"');
    expect(sources.svelte).toContain("let modal: Modal;");
    expect(sources.svelte).toContain("bind:this={modal}");
    expect(sources.solid).toContain("let modal!: Modal;");
    expect(sources.solid).toContain("ref={modal}");
    expect(sources.solid).toContain("on:click={onClick}");
  });

  it("supports capture listeners where the framework can, imperatively elsewhere", async () => {
    const { sources } = await generate({
      page: "form",
      demo: "invalid",
      html: `<form id="f"></form>\n`,
      script: `export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#f")!;
  const onInvalid = () => form.reset();
  form.addEventListener("invalid", onInvalid, true);
  return () => form.removeEventListener("invalid", onInvalid, true);
}
`,
    });
    expect(sources.vue).toContain('@invalid.capture="onInvalid"');
    expect(sources.svelte).toContain("oninvalidcapture={onInvalid}");
    expect(sources.solid).toContain("oncapture:invalid={onInvalid}");
    // Angular templates have no capture syntax
    expect(sources.angular).toContain(
      'this.form.nativeElement.addEventListener("invalid", this.onInvalid, true)',
    );
    expect(sources.angular).toContain("ngOnDestroy(): void {");
    expect(sources.angular).toContain("removeEventListener");
  });

  it("assigns DOM queries on mount (deferred members)", async () => {
    const { sources, fallbacks } = await generate({
      page: "checkbox",
      demo: "all",
      html: `<div><minerva-checkbox class="item"></minerva-checkbox></div>\n`,
      script: `type Box = HTMLElement & { checked: boolean };
export function setup(root: HTMLElement) {
  const items = Array.from(root.querySelectorAll<Box>(".item"));
  const all = () => items.every((item) => item.checked);
  items.forEach((item) => item.addEventListener("change", all));
}
`,
    });
    expect(fallbacks).toEqual({});
    expect(sources.vue).toContain("let items: Box[] = [];");
    expect(sources.vue).toMatch(
      /onMounted\(\(\) => \{\n\s+items = Array\.from/,
    );
    expect(sources.angular).toContain("items: Box[] = [];");
    expect(sources.angular).toContain("this.items = Array.from(");
    expect(sources.angular).toContain("this.items.every(");
  });

  it("falls back to the original setup function, run on mount", async () => {
    const { sources, fallbacks } = await generate({
      page: "x",
      demo: "early",
      html: `<p id="p"></p>\n`,
      script: `export function setup(root: HTMLElement) {
  const p = root.querySelector<HTMLElement>("#p")!;
  if (!p) return;
  p.textContent = "hi";
}
`,
    });
    expect(Object.keys(fallbacks).sort()).toEqual([
      "angular",
      "solid",
      "svelte",
      "vue",
    ]);
    expect(sources.vue).toContain(
      "onMounted(() => (cleanup = setup(root.value!)));",
    );
    expect(sources.angular).toContain(
      "this.cleanup = setup(this.root.nativeElement);",
    );
    expect(sources.svelte).toContain("onMount(() => setup(root));");
    expect(sources.solid).toContain("const cleanup = setup(root);");
    expect(sources.html).toContain("setup(document.body);");
  });

  it("escapes template syntax of each framework", async () => {
    const { sources } = await generate({
      page: "code",
      demo: "text",
      html: `<p>confirm({ host }) · jane@example.com</p>
<minerva-json-field value='{"a":1}'></minerva-json-field>
<input name="q" />
<!-- a comment -->
<style>
  p::part(x) { color: red; }
</style>
`,
    });
    expect(sources.angular).toContain("confirm(&#123; host &#125;)");
    expect(sources.angular).toContain("jane&#64;example.com");
    expect(sources.angular).toContain("styles: `");
    expect(sources.svelte).toContain("confirm(&#123; host &#125;)");
    expect(sources.svelte).toContain(`value={"{\\"a\\":1}"}`);
    expect(sources.svelte).toMatch(/<style>\n\s+p::part\(x\)/);
    expect(sources.solid).toContain("&#123; host &#125;");
    expect(sources.solid).toContain("{/* a comment */}");
    expect(sources.solid).toMatch(/<input name="q" \/>/);
    expect(sources.solid).toContain("<style>{`");
    expect(sources.vue).toMatch(/<\/template>\n\n<style>/);
    expect(sources.vue).toContain("confirm({ host })");
  });

  it("escapes </script inside strings of script blocks", async () => {
    const { sources } = await generate({
      page: "html-preview",
      demo: "x",
      html: `<minerva-html-preview id="p"></minerva-html-preview>\n`,
      script: `export function setup(root: HTMLElement) {
  const p = root.querySelector<HTMLElement & { html: string }>("#p")!;
  p.html = "<script>alert(1)</script>";
}
`,
    });
    for (const fw of ["vue", "svelte", "html"] as const) {
      const script = block(sources[fw], /<script[^>]*>/, "\n</script>")!;
      expect(script).not.toMatch(/<\/script/i);
      expect(script).toContain("<\\/script>");
    }
  });

  it("is deterministic", () => {
    expect(transformWcDemo(MENU)).toEqual(transformWcDemo(MENU));
  });
});

describe("transformWcDemo: every docs demo", () => {
  it("covers every Web Component demo of the docs", () => {
    expect(corpus.length).toBeGreaterThan(150);
  });

  it.each(corpus.map((input) => [`${input.page}/${input.demo}`, input]))(
    "%s",
    async (_, input) => {
      const { sources, fallbacks, errors } = await generate(
        input as WcDemoInput,
      );
      // idiomatic output: no demo needs the imperative fallback
      expect(fallbacks).toEqual({});
      // Prettier parsed every source
      expect(errors).toEqual([]);
      const out = sources as WcFrameworkSources;
      expect(Object.keys(out).sort()).toEqual([...WC_FRAMEWORKS].sort());

      const vueScript = block(out.vue, /<script setup lang="ts">/, "</script>");
      if (vueScript) expect(syntaxErrors(vueScript, "a.ts")).toEqual([]);
      const vueTemplate = block(out.vue, /<template>/, "\n</template>")!;
      expect(unclosed(vueTemplate)).toEqual([]);

      expect(syntaxErrors(out.angular, "a.component.ts")).toEqual([]);
      const angularTemplate = block(out.angular, /template: `/, "`")!;
      expect(unclosed(angularTemplate)).toEqual([]);

      const svelteScript = block(out.svelte, /<script lang="ts">/, "</script>");
      if (svelteScript) expect(syntaxErrors(svelteScript, "a.ts")).toEqual([]);

      expect(syntaxErrors(out.solid, "a.tsx")).toEqual([]);

      const htmlScript = block(
        out.html,
        /<script type="module">/,
        "</script>",
      )!;
      expect(syntaxErrors(htmlScript, "a.js")).toEqual([]);
      expect(htmlScript).toContain('import "minerva-design/web-components";');

      // framework sources never reach into the DOM through the demo root
      for (const fw of ["vue", "angular", "svelte", "solid"] as const) {
        expect(out[fw]).not.toMatch(
          /\broot\.(value!?\.|nativeElement\.)?querySelector\(/,
        );
        expect(out[fw]).not.toContain("export function setup");
      }
      if (input.script) {
        // the setup root becomes `document` in plain HTML
        expect(htmlScript).not.toMatch(/\broot\./);
      }
    },
  );
});

describe("wcFrameworksPlugin source reader", () => {
  it("reads a demo and its script from disk", async () => {
    const file = join(PAGES, "menu/wc/basic.html");
    const { sources, files } = await readWcFrameworkSources(file);
    expect(files).toEqual([file, file.replace(/\.html$/, ".ts")]);
    expect(sources.vue).toContain("<!-- MenuBasic.vue -->");
    expect(sources.angular).toContain('selector: "app-menu-basic"');
  });
});
