import assert from "node:assert/strict";

/** Uses Chrome's autofill pseudo-state, including its real protected UA paint. */
export async function inspectAutofill({
  call,
  evaluate,
  field,
  expectTint = true,
  capture,
}) {
  await evaluate(
    `(${field}).scrollIntoView({block:'center',behavior:'instant'});(${field}).focus()`,
  );
  await evaluate(
    `(async()=>{const root=(${field}).parentElement;const deadline=performance.now()+2000;while(root.getAnimations().some(animation=>animation.playState==='running')){if(performance.now()>deadline)throw Error('Input frame animation did not settle');await new Promise(resolve=>requestAnimationFrame(resolve));}})()`,
  );
  const before = await evaluate(
    `(()=>{const field=${field},root=field.parentElement;return {value:field.value,name:field.getAttribute('name'),autocomplete:field.getAttribute('autocomplete'),shadow:getComputedStyle(root).boxShadow,background:getComputedStyle(root).backgroundColor};})()`,
  );
  await call("DOM.enable");
  await call("CSS.enable");
  await call("DOM.getDocument", { depth: 0, pierce: true });
  const object = await call("Runtime.evaluate", {
    expression: field,
    returnByValue: false,
  });
  const { nodeId } = await call("DOM.requestNode", {
    objectId: object.result.objectId,
  });
  assert.ok(
    nodeId,
    "native field is addressable through its shadow boundaries",
  );
  await call("CSS.forcePseudoState", {
    nodeId,
    forcedPseudoClasses: ["autofill"],
  });
  try {
    const geometry = await evaluate(
      `(()=>{const field=${field},root=field.parentElement,r=root.getBoundingClientRect(),f=field.getBoundingClientRect(),s=getComputedStyle(field);return {autofill:field.matches(':autofill'),rootBackground:getComputedStyle(root).backgroundColor,textColor:getComputedStyle(root).color,shadow:getComputedStyle(root).boxShadow,fieldShadow:s.boxShadow,fill:s.webkitTextFillColor,caret:s.caretColor,points:[{x:r.left+8,y:r.bottom-6},{x:f.right-12,y:f.bottom-6},{x:r.right-8,y:r.bottom-6}]};})()`,
    );
    assert.equal(geometry.autofill, true);
    assert.equal(
      geometry.fill,
      geometry.textColor,
      "autofill text follows the theme, not the UA FieldText color",
    );
    assert.equal(
      geometry.caret,
      geometry.textColor,
      "the caret stays legible on the themed autofill surface",
    );
    assert.equal(
      geometry.shadow,
      before.shadow,
      "autofill must not replace the frame's border or focus indicator",
    );
    if (expectTint)
      assert.notEqual(
        geometry.rootBackground,
        before.background,
        "autofill remains visibly indicated across the whole frame",
      );
    const { data } = await call("Page.captureScreenshot", { format: "png" });
    const pixels = await evaluate(
      `new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>{const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const context=canvas.getContext('2d');context.drawImage(image,0,0);resolve(${JSON.stringify(geometry.points)}.map(p=>[...context.getImageData(Math.floor(p.x),Math.floor(p.y),1,1).data]));};image.onerror=reject;image.src=${JSON.stringify("data:image/png;base64," + data)};})`,
    );
    for (const pixel of pixels.slice(1))
      assert.ok(
        pixel.every((value, i) => Math.abs(value - pixels[0][i]) <= 2),
        JSON.stringify({
          message: "autofill field and prefix/suffix surfaces must match",
          pixels,
          geometry,
        }),
      );
    if (capture) await capture();
    const after = await evaluate(
      `(()=>{const field=${field};return {value:field.value,name:field.getAttribute('name'),autocomplete:field.getAttribute('autocomplete')};})()`,
    );
    assert.deepEqual(after, {
      value: before.value,
      name: before.name,
      autocomplete: before.autocomplete,
    });
    return { ...geometry, pixels };
  } finally {
    await call("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: [] });
    await call("Runtime.releaseObject", { objectId: object.result.objectId });
  }
}

export async function checkInputAutofill({
  call,
  evaluate,
  wait,
  page,
  results,
  capture,
}) {
  await page("input", 1280, "react");
  const savedTheme = await evaluate(
    "localStorage.getItem('minerva-docs-theme')",
  );
  for (const framework of ["react", "vue", "angular", "html"]) {
    for (const theme of ["light", "dark"]) {
      await page("input", 1280, framework);
      await evaluate(
        `localStorage.setItem('minerva-docs-theme',${JSON.stringify(theme)});window.__autofillReloadPending=true`,
      );
      await call("Page.reload");
      await wait(
        `!window.__autofillReloadPending&&document.documentElement?.getAttribute('data-theme-name')===${JSON.stringify(theme)}&&document.querySelector('[data-demo-preview]')`,
      );
      await wait(
        `(()=>{const deep=(root,selector)=>{const own=[...root.querySelectorAll(selector)];for(const element of root.querySelectorAll('*'))if(element.shadowRoot)own.push(...deep(element.shadowRoot,selector));return own;};const frame=document.querySelector(${JSON.stringify(framework === "angular" ? '[id$="login-and-browser-autofill"] [data-angular-demo]' : '[id$="demo-autofill"] [data-demo-preview]')});if(!frame)return false;const fields=deep(frame,'input').filter(field=>['username','current-password'].includes(field.getAttribute('autocomplete')));if(fields.length!==2)return false;window.__inputAutofill={frame,fields};return true;})()`,
      );
      for (let index = 0; index < 2; index++) {
        const field = `window.__inputAutofill.fields[${index}]`;
        await evaluate(`(${field}).focus()`);
        await call("Input.insertText", {
          text: index === 0 ? "autofill-demo" : "demo-password",
        });
        const state = await inspectAutofill({
          call,
          evaluate,
          field,
          capture: capture
            ? () => capture(`input-autofill-${framework}-${theme}-${index}`)
            : undefined,
        });
        results.push({
          check: "input-autofill-surface",
          framework,
          theme,
          field: index === 0 ? "username" : "password",
          ...state,
        });
      }
    }
  }
  await evaluate(
    `localStorage.${savedTheme === null ? "removeItem('minerva-docs-theme')" : `setItem('minerva-docs-theme',${JSON.stringify(savedTheme)})`};window.__autofillReloadPending=true`,
  );
  await call("Page.reload");
  await wait(
    "!window.__autofillReloadPending&&document.querySelector('[data-demo-preview]')",
  );
}
