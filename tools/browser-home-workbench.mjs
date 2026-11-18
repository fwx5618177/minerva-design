import assert from "node:assert/strict";

export async function checkHomeWorkbench({
  call,
  evaluate,
  wait,
  page,
  results,
  capture,
}) {
  const preview = 'document.querySelector("[data-testid=playground-preview]")';
  const stage = 'document.querySelector("[data-home-playground]")';
  const click = async (expression) => {
    const at = await evaluate(
      `(()=>{const el=(${expression});el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
    );
    // Closing modal surfaces remain present during their exit animation.
    // Wait for actual hit-test actionability rather than clicking through them.
    await wait(
      `(()=>{const el=(${expression});const top=document.elementFromPoint(${at.x},${at.y});return top===el||el.contains(top);})()`,
    );
    for (const type of ["mouseMoved", "mousePressed", "mouseReleased"])
      await call("Input.dispatchMouseEvent", {
        type,
        ...at,
        button: type === "mouseMoved" ? "none" : "left",
        buttons: type === "mousePressed" ? 1 : 0,
        ...(type === "mouseMoved" ? {} : { clickCount: 1 }),
      });
  };
  await page("", 1440, "react");
  const originalLocale = await evaluate("document.documentElement.lang");
  const switchLocale = async (locale) => {
    await page("", 1440, "react");
    await evaluate(
      `localStorage.setItem("minerva-docs-language", "${locale}")`,
    );
    await call("Page.navigate", {
      url: await evaluate(
        `location.href.split("#")[0].split("?")[0] + "?ui-locale=${locale}#/"`,
      ),
    });
    await wait(
      `document.documentElement.lang === "${locale}" && ${preview}?.querySelector("input")`,
    );
  };
  for (const locale of ["en", "zh", "ja", "fr"]) {
    await switchLocale(locale);
    for (const width of [1440, 1024, 768, 390]) {
      await page("", width, "react");
      await wait(
        `${preview}?.querySelector('[data-minerva="date-picker"] input')`,
      );
      const geometry = await evaluate(
        `(()=>{const preview=${preview};const r=preview.getBoundingClientRect();return {viewport:innerWidth,pageWidth:document.documentElement.scrollWidth,frame:{left:r.left,right:r.right,width:r.width},overflow:[...document.querySelectorAll("body *")].filter(el=>{const q=el.getBoundingClientRect();return q.left>=0 && q.right>innerWidth+1}).slice(0,8).map(el=>({tag:el.tagName,class:el.className,right:el.getBoundingClientRect().right})),fields:[...preview.querySelectorAll('input:not([type=checkbox])')].map(el=>{const q=el.getBoundingClientRect();return {left:q.left,right:q.right,width:q.width}}),logos:[...document.querySelectorAll('[data-minerva-logo]')].map(el=>el.getAttribute('src'))}})()`,
      );
      assert.ok(geometry.pageWidth <= width, JSON.stringify(geometry));
      assert.ok(
        geometry.frame.left >= 0 && geometry.frame.right <= width + 1,
        JSON.stringify(geometry),
      );
      assert.ok(
        geometry.fields.every(
          (r) =>
            r.width > 0 &&
            r.left >= geometry.frame.left &&
            r.right <= geometry.frame.right + 1,
        ),
        JSON.stringify(geometry),
      );
      assert.ok(
        geometry.logos.length >= 3 && new Set(geometry.logos).size === 1,
        JSON.stringify(geometry),
      );
      await evaluate(
        "window.scrollTo({top:0,behavior:'instant'});new Promise(r=>requestAnimationFrame(r))",
      );
      if (capture) await capture(`home-${locale}-${width}`);
      await evaluate(`${preview}.scrollIntoView({block:'center'})`);
      if (capture) await capture(`workbench-${locale}-${width}`);
      results.push({
        check: "home-workbench-responsive",
        locale,
        width,
        ...geometry,
      });
    }
  }
  await switchLocale(originalLocale);
  await page("", 1280, "react");
  await wait(`${preview}?.querySelector('button')`);
  await click(
    `${preview}.querySelector('[data-minerva="button"][data-part="root"]')`,
  );
  await wait(
    'document.querySelector("[data-minerva=command-dialog][data-part=input]")',
  );
  await call("Input.insertText", { text: "calendar" });
  await wait(
    'document.querySelectorAll("[data-minerva=command-dialog][data-part=item]").length===1',
  );
  for (const type of ["keyDown", "keyUp"])
    await call("Input.dispatchKeyEvent", {
      type,
      key: "Enter",
      code: "Enter",
      windowsVirtualKeyCode: 13,
    });
  await wait(
    `${preview}.querySelector('[data-minerva="date-picker"] input')===document.activeElement`,
  );
  const date = `${preview}.querySelector('[data-minerva="date-picker"] input')`;
  const before = await evaluate(`${date}.value`);
  await click(date);
  await wait(
    'document.querySelector("[data-minerva=date-picker][data-part=content][data-state=open]")',
  );
  await click(
    `document.querySelector('[data-minerva="date-picker"][data-part="content"] [role="gridcell"][data-date]:not([data-outside]):not([aria-disabled="true"]):not([aria-selected="true"])')`,
  );
  await wait(
    '!document.querySelector("[data-minerva=date-picker][data-part=content][data-state=open]")',
  );
  const selected = await evaluate(`${date}.value`);
  assert.match(selected, /^\d{4}-\d{2}-\d{2}$/);
  assert.notEqual(selected, before);
  await click(
    `${preview}.querySelectorAll('[data-minerva="checkbox"][data-part="root"]')[1]`,
  );
  await click(
    `[...${preview}.querySelectorAll('[data-minerva="button"][data-part="root"]')].at(-1)`,
  );
  await wait(
    `${preview}.querySelector('[data-minerva="tag"][data-color="success"]')`,
  );
  const saved = await evaluate(
    `${preview}.querySelector('output').textContent`,
  );
  assert.match(saved, /1\s*$/);
  if (capture) await capture("workbench-saved");
  // Reduced motion also disables the pointer-following lighting updates.
  await call("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  const lighting = await evaluate(
    `${stage}.style.getPropertyValue('--pointer-x')`,
  );
  const point = await evaluate(
    `(()=>{const el=${stage};el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();return {x:r.left+30,y:Math.max(80,r.top+30)}})()`,
  );
  await call("Input.dispatchMouseEvent", { type: "mouseMoved", ...point });
  assert.equal(
    await evaluate(`${stage}.style.getPropertyValue('--pointer-x')`),
    lighting,
  );
  await call("Emulation.setEmulatedMedia", { features: [] });
  results.push({
    check: "home-workbench-real-flow",
    selected,
    saved,
    reducedMotion: true,
  });
}
