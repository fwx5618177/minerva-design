// Production-browser regression lane for component/doc issues #15–22.
// Uses an isolated Chrome profile and owns/cleans up its preview process.
import { spawn } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
import { launchChrome } from "./chrome-cdp.mjs";
import { join } from "node:path";
import assert from "node:assert/strict";
import { checkQuadrantPointer } from "./browser-quadrant-checks.mjs";
import { checkHeatmapFrameworks } from "./browser-heatmap-frameworks.mjs";
import { checkHeatmapTerminal } from "./browser-heatmap-terminal.mjs";
import { checkChartHoverPerformance } from "./browser-chart-performance.mjs";
import { checkQuadrantCard } from "./browser-quadrant-card-checks.mjs";
import { checkCdnFiles } from "./browser-cdn-checks.mjs";
import { checkMediaPlayerDocs } from "./browser-media-player-checks.mjs";
import { checkModalIframeFocus } from "./browser-modal-focus.mjs";
import { checkFocusPresentation } from "./browser-focus-presentation.mjs";
import { checkHomeWorkbench } from "./browser-home-workbench.mjs";
import { checkTablePagination } from "./browser-table-pagination.mjs";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
import { fileURLToPath } from "node:url";
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const DOCS = join(ROOT, "apps/docs");
const PORT = Number(process.env.UI_E2E_PORT ?? 5396);
assert.ok(
  Number.isInteger(PORT) && PORT > 1023 && PORT < 65536,
  "UI_E2E_PORT must be an unprivileged TCP port",
);
const BASE = `http://127.0.0.1:${PORT}/minerva-design/`;
const ARTIFACTS = join(ROOT, ".artifacts/ui-issues");
let browser, previewError;
const preview = spawn(
  process.execPath,
  [
    join(ROOT, "node_modules/vite/bin/vite.js"),
    "preview",
    "--host",
    "127.0.0.1",
    "--port",
    String(PORT),
    "--strictPort",
  ],
  { cwd: DOCS, stdio: ["ignore", "ignore", "pipe"] },
);
let previewOutput = "";
preview.stderr.on("data", (data) => {
  previewOutput += data;
});
preview.on("error", (error) => {
  previewError = error;
});
try {
  let ready = false;
  for (let i = 0; i < 150; i++) {
    if (previewError || preview.exitCode !== null)
      throw Error(`Preview failed: ${previewError ?? previewOutput}`);
    try {
      if ((await fetch(BASE)).ok) {
        ready = true;
        break;
      }
    } catch {
      /* waiting for the owned preview */
    }
    await sleep(100);
  }
  if (!ready)
    throw Error("Production docs preview did not start. Run pnpm build first.");
  browser = await launchChrome();
  const { call, evaluate } = browser;
  const wait = async (expression) => {
    for (let i = 0; i < 150; i++) {
      if (await evaluate(`Boolean(${expression})`)) return;
      await sleep(100);
    }
    const pointerTrace = await evaluate(
      `window.__quadrantTest?.events ?? null`,
    );
    throw Error(
      "Not ready " +
        expression +
        (pointerTrace ? "\n" + JSON.stringify(pointerTrace) : ""),
    );
  };
  const page = async (route, width = 1280, framework = "react") => {
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await call("Page.navigate", {
      url: BASE + "#/" + route + "?framework=" + framework,
    });
    await wait('document.querySelector("[data-demo-preview]")');
    await sleep(300);
  };
  const results = [];
  await checkTablePagination({
    call,
    evaluate,
    wait,
    page,
    results,
    capture: async (name) => {
      await mkdir(ARTIFACTS, { recursive: true });
      const { data } = await call("Page.captureScreenshot", { format: "png" });
      await writeFile(
        join(ARTIFACTS, `${name}.png`),
        Buffer.from(data, "base64"),
      );
    },
  });
  await checkHomeWorkbench({
    call,
    evaluate,
    wait,
    page,
    results,
    capture: async (name) => {
      await mkdir(ARTIFACTS, { recursive: true });
      const { data } = await call("Page.captureScreenshot", { format: "png" });
      await writeFile(
        join(ARTIFACTS, `${name}.png`),
        Buffer.from(data, "base64"),
      );
    },
  });
  await checkFocusPresentation({
    call,
    evaluate,
    wait,
    page,
    results,
    capture: async (name) => {
      await mkdir(ARTIFACTS, { recursive: true });
      const { data } = await call("Page.captureScreenshot", { format: "png" });
      await writeFile(
        join(ARTIFACTS, `${name}.png`),
        Buffer.from(data, "base64"),
      );
    },
  });
  await checkMediaPlayerDocs({
    call,
    evaluate,
    wait,
    page,
    results,
    capture: async (name, selector) => {
      await mkdir(ARTIFACTS, { recursive: true });
      await evaluate(
        `document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`,
      );
      const { data } = await call("Page.captureScreenshot", { format: "png" });
      await writeFile(
        join(ARTIFACTS, `${name}.png`),
        Buffer.from(data, "base64"),
      );
    },
  });
  await checkModalIframeFocus({ call, evaluate, wait, page, results });
  await checkCdnFiles({ call, evaluate, wait, results });
  for (const width of [320, 390, 1280]) {
    await page("table", width);
    const data = await evaluate(
      `(()=>{const table=[...document.querySelectorAll('[data-demo-preview] table')].find(t=>t.textContent.includes('Customer')&&t.textContent.includes('Actions'));const viewport=table.parentElement;return {width:viewport.clientWidth,fallback:viewport.hasAttribute('data-fixed-overflow'),fixed:[...table.querySelectorAll('thead [data-fixed]')].map(c=>({text:c.textContent,position:getComputedStyle(c).position})),scrollWidth:viewport.scrollWidth};})()`,
    );
    assert.ok(data.fixed.length >= 3);
    if (width < 400) {
      assert.equal(data.fallback, true);
      assert.ok(data.fixed.every((c) => c.position !== "sticky"));
      assert.ok(data.scrollWidth > data.width);
    } else assert.equal(data.fallback, false);
    results.push({ check: "table", viewport: width, ...data });
  }
  await page("form-layout");
  const theme = await evaluate(
    `(()=>{const input=document.querySelector('[data-demo-preview] [data-minerva="input"][data-part="root"]');const props=['--surface-color','--text-color'];return props.map(p=>({token:p,root:getComputedStyle(document.documentElement).getPropertyValue(p).trim(),demo:getComputedStyle(input).getPropertyValue(p).trim()}));})()`,
  );
  assert.ok(theme.every((t) => t.root === t.demo));
  results.push({ check: "theme-isolation", theme });

  const contrastHelpers = `const rgb=color=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const c=canvas.getContext('2d');c.fillStyle=color;c.fillRect(0,0,1,1);return [...c.getImageData(0,0,1,1).data].slice(0,3);};const luminance=color=>rgb(color).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};const background=el=>{for(let e=el;e;e=e.parentElement){const c=getComputedStyle(e).backgroundColor;if(c!=='rgba(0, 0, 0, 0)'&&c!=='transparent')return c;}return 'white';};`;
  for (const mode of ["light", "dark", "github-dark"]) {
    await page("form-layout");
    await evaluate(`localStorage.setItem('minerva-docs-theme','${mode}')`);
    await call("Page.reload");
    await wait(
      'document.querySelector("[data-demo-preview] [data-minerva=\\"input\\"][data-part=\\"root\\"]")',
    );
    const data = await evaluate(
      `(()=>{${contrastHelpers}const root=document.querySelector('[data-demo-preview] [data-minerva="input"][data-part="root"]');const style=getComputedStyle(root);const border=style.boxShadow.match(/color\\([^)]+\\)|rgba?\\([^)]+\\)/)?.[0];return {mode:'${mode}',border,background:background(root),contrast:contrast(border,background(root)),surface:getComputedStyle(root).getPropertyValue('--surface-color').trim(),rootSurface:getComputedStyle(document.documentElement).getPropertyValue('--surface-color').trim()};})()`,
    );
    assert.ok(data.contrast >= 3, JSON.stringify(data));
    assert.equal(data.surface, data.rootSurface);
    results.push({ check: "control-border-contrast", ...data });
    await page("input");
    const readonly = await evaluate(
      `(()=>{const input=document.querySelector('[data-demo-preview] input[readonly]');const root=input.closest('[data-minerva="input"][data-part="root"]');input.focus();return {value:input.value,focusable:document.activeElement===input,background:getComputedStyle(root).backgroundColor};})()`,
    );
    assert.equal(readonly.focusable, true);
    results.push({ check: "readonly-readable", mode, ...readonly });
    await page("switch");
    await call("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Tab",
      code: "Tab",
      windowsVirtualKeyCode: 9,
    });
    await call("Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "Tab",
      code: "Tab",
      windowsVirtualKeyCode: 9,
    });
    await evaluate(
      `document.querySelector('[data-demo-preview] input[type="checkbox"]').focus()`,
    );
    await sleep(250);
    const focus = await evaluate(
      `(()=>{${contrastHelpers}const input=document.querySelector('[data-demo-preview] input[type="checkbox"]');const control=input.parentElement;const style=getComputedStyle(control);return {visible:input.matches(':focus-visible'),width:parseFloat(style.outlineWidth),style:style.outlineStyle,color:style.outlineColor,contrast:contrast(style.outlineColor,background(control.parentElement))};})()`,
    );
    assert.equal(focus.visible, true);
    assert.equal(focus.style, "solid");
    assert.ok(focus.width >= 2);
    assert.ok(focus.contrast >= 3, JSON.stringify(focus));
    results.push({ check: "switch-focus", mode, ...focus });
    await page("date-picker");
    await evaluate(
      `document.querySelector('[data-demo-preview] [data-minerva="date-picker"] input').click()`,
    );
    await wait(
      `document.querySelector('[role="gridcell"][data-outside]:not([aria-disabled="true"])')`,
    );
    const outside = await evaluate(
      `(()=>{${contrastHelpers}const cell=document.querySelector('[role="gridcell"][data-outside]:not([aria-disabled="true"])');return {date:cell.getAttribute('aria-label'),color:getComputedStyle(cell).color,contrast:contrast(getComputedStyle(cell).color,background(cell))};})()`,
    );
    assert.ok(outside.contrast >= 4.5, JSON.stringify(outside));
    await evaluate(
      `document.querySelector('[role="gridcell"][data-outside]:not([aria-disabled="true"])').click()`,
    );
    await wait(
      `document.querySelector('[data-demo-preview] [data-minerva="date-picker"] input').value==='${outside.date}'`,
    );
    results.push({ check: "selectable-outside-date", mode, ...outside });
  }
  await page("design-presets");
  await evaluate(
    `[...document.querySelectorAll('[role="group"][aria-label="Design preset"] button')].find(b=>b.textContent.trim()==='touch').click()`,
  );
  await sleep(100);
  const switches = await evaluate(
    `[...document.querySelectorAll('[data-demo-preview] [data-minerva="switch"][data-part="root"]')].map(e=>({height:e.getBoundingClientRect().height,touch:getComputedStyle(e).getPropertyValue('--touch-target-min').trim()})).filter(e=>e.touch==='44px')`,
  );
  assert.ok(switches.length);
  assert.ok(switches.every((s) => s.height >= 44));
  results.push({ check: "touch-switches", switches });
  await checkQuadrantCard({
    call,
    evaluate,
    wait,
    page,
    results,
    capture: async (name) => {
      await mkdir(ARTIFACTS, { recursive: true });
      const { data } = await call("Page.captureScreenshot", { format: "png" });
      await writeFile(
        join(ARTIFACTS, `${name}.png`),
        Buffer.from(data, "base64"),
      );
    },
  });
  // The paint probe needs a fresh chart mount, not the same active hash route.
  await page("design-presets");
  await checkQuadrantPointer({ call, evaluate, wait, page, results });
  await checkChartHoverPerformance({ call, evaluate, wait, page, results });
  await checkHeatmapTerminal({
    call,
    evaluate,
    wait,
    page,
    results,
    capture: async (name, selector) => {
      await mkdir(ARTIFACTS, { recursive: true });
      const clip = await evaluate(
        `(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1};})()`,
      );
      const { data } = await call("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip,
      });
      await writeFile(
        join(ARTIFACTS, `${name}.png`),
        Buffer.from(data, "base64"),
      );
    },
  });
  await checkHeatmapFrameworks({ call, evaluate, wait, page, results });
  await call("Page.navigate", {
    url: BASE + "#/empty?framework=vue",
  });
  await wait(
    `[...document.querySelectorAll('[data-demo-preview] button')].some(b=>b.textContent.includes('Create project'))`,
  );
  await evaluate(
    `[...document.querySelectorAll('[data-demo-preview] button')].find(b=>b.textContent.includes('Create project')).click()`,
  );
  await wait(`document.body.textContent.includes('Project created')`);
  results.push({ check: "vue-empty", created: true });
  const index = await (await fetch(BASE + "reference/index.json")).json();
  const input = index.pages.find(
    (p) => p.page === "input" && p.locale === "zh" && p.renderer === "vue",
  );
  const text = await (
    await fetch(new URL(input.markdown, BASE + "reference/index.json"))
  ).text();
  assert.ok(text.includes("modelValue"));
  assert.ok(text.includes("minerva-design/vue"));
  results.push({
    check: "plain-http-reference",
    version: index.packageVersion,
    bytes: text.length,
  });
  for (const [route, framework, minimum] of [
    ["installation", "react", 2],
    ["web-components", "react", 2],
    ["wc-plain-html", "react", 3],
    ["button", "html", 1],
  ]) {
    await page(route, 1280, framework);
    await wait(`document.querySelector('article a[href$="/${route}.json"]')`);
    await wait(
      `[...document.querySelectorAll('pre')].some(el=>el.textContent.includes('https://cdn.jsdelivr.net/npm/minerva-design'))`,
    );
    const urls = await evaluate(
      `[...document.querySelectorAll('pre')].flatMap(el=>el.textContent.split('"').filter(text=>text.startsWith('https://')&&text.includes('/minerva-design')))`,
    );
    assert.ok(urls.length >= minimum, JSON.stringify({ route, urls }));
    for (const url of urls)
      assert.ok(url.includes(`minerva-design@${index.packageVersion}/`), url);
    results.push({
      check: "cdn-docs-version",
      route,
      framework,
      version: index.packageVersion,
      urls,
    });
  }
  await mkdir(ARTIFACTS, { recursive: true });
  const { data } = await call("Page.captureScreenshot", { format: "png" });
  await writeFile(
    join(ARTIFACTS, "vue-empty.png"),
    Buffer.from(data, "base64"),
  );
  await writeFile(
    join(ARTIFACTS, "report.json"),
    JSON.stringify(results, null, 2) + "\n",
  );
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser?.close();
  preview.kill("SIGTERM");
  await sleep(300);
}
