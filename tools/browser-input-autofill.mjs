import assert from "node:assert/strict";

/** Uses Chrome's autofill pseudo-state, including its real protected UA paint. */
export async function inspectAutofill({
  call,
  evaluate,
  field,
  expectTint = true,
  capture,
  focused = true,
  autofill = true,
}) {
  await evaluate(
    `(${field}).scrollIntoView({block:'center',behavior:'instant'});(${field}).${focused ? "focus" : "blur"}()`,
  );
  await evaluate(
    `(async()=>{const root=(${field}).parentElement;const deadline=performance.now()+2000;while(root.getAnimations().some(animation=>animation.playState==='running')){if(performance.now()>deadline)throw Error('Input frame animation did not settle');await new Promise(resolve=>requestAnimationFrame(resolve));}})()`,
  );
  const before = await evaluate(
    `(()=>{const field=${field},root=field.parentElement;return {value:field.value,name:field.getAttribute('name'),autocomplete:field.getAttribute('autocomplete'),shadow:getComputedStyle(root).boxShadow,border:getComputedStyle(root).borderColor,background:getComputedStyle(root).backgroundColor};})()`,
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
    forcedPseudoClasses: autofill ? ["autofill"] : [],
  });
  try {
    const geometry = await evaluate(
      `(()=>{const field=${field},root=field.parentElement,r=root.getBoundingClientRect(),f=field.getBoundingClientRect(),s=getComputedStyle(field);return {autofill:field.matches(':autofill'),rootBackground:getComputedStyle(root).backgroundColor,textColor:getComputedStyle(root).color,shadow:getComputedStyle(root).boxShadow,border:getComputedStyle(root).borderColor,fieldShadow:s.boxShadow,fill:s.webkitTextFillColor,caret:s.caretColor,borderPoints:[Math.floor(r.top),Math.floor(r.bottom)-3].flatMap(y=>[0,1,2].flatMap(dy=>[{x:r.left+20,y:y+dy},{x:f.left+f.width/2,y:y+dy},{x:r.right-20,y:y+dy}])),points:[{x:r.left+8,y:r.bottom-6},{x:f.right-12,y:f.bottom-6},{x:r.right-8,y:r.bottom-6}]};})()`,
    );
    assert.equal(geometry.autofill, autofill);
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
    assert.equal(
      geometry.border,
      before.border,
      "autofill preserves the real frame border color",
    );
    if (autofill && expectTint)
      assert.notEqual(
        geometry.rootBackground,
        before.background,
        "autofill remains visibly indicated across the whole frame",
      );
    const { data } = await call("Page.captureScreenshot", { format: "png" });
    const pixels = await evaluate(
      `new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>{const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const context=canvas.getContext('2d');context.drawImage(image,0,0);resolve(${JSON.stringify([...geometry.points, ...geometry.borderPoints])}.map(p=>[...context.getImageData(Math.floor(p.x),Math.floor(p.y),1,1).data]));};image.onerror=reject;image.src=${JSON.stringify("data:image/png;base64," + data)};})`,
    );
    for (const pixel of pixels.slice(1, 3))
      assert.ok(
        pixel.every((value, i) => Math.abs(value - pixels[0][i]) <= 2),
        JSON.stringify({
          message: "autofill field and prefix/suffix surfaces must match",
          pixels,
          geometry,
        }),
      );
    for (let row = 0; row < 6; row++) {
      const edge = pixels.slice(3 + row * 3, 6 + row * 3);
      for (const pixel of edge.slice(1))
        assert.ok(
          pixel.every((value, i) => Math.abs(value - edge[0][i]) <= 2),
          JSON.stringify({
            message:
              "Input border must continue across prefix, field and suffix",
            row,
            edge,
            geometry,
          }),
        );
    }
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
        for (const focused of [false, true]) {
          for (const autofill of [false, true]) {
            const state = await inspectAutofill({
              focused,
              autofill,
              call,
              evaluate,
              field,
              capture: capture
                ? () =>
                    capture(
                      `input-autofill-${framework}-${theme}-${index}-${focused ? "focus" : "rest"}-${autofill ? "filled" : "normal"}`,
                    )
                : undefined,
            });
            results.push({
              check: "input-autofill-surface",
              framework,
              theme,
              focused,
              field: index === 0 ? "username" : "password",
              ...state,
            });
          }
        }
      }
      await wait(
        `(()=>{const deep=root=>{const own=[...root.querySelectorAll('input[aria-invalid="true"]')];for(const element of root.querySelectorAll('*'))if(element.shadowRoot)own.push(...deep(element.shadowRoot));return own;};const field=deep(document).find(field=>(field.parentElement?.getAttribute('data-minerva')??field.parentElement?.getAttribute('data-component'))==='input');if(!field)return false;window.__invalidInput=field;return true;})()`,
      );
      for (const focused of [false, true])
        for (const autofill of [false, true]) {
          const state = await inspectAutofill({
            call,
            evaluate,
            field: "window.__invalidInput",
            focused,
            autofill,
            capture: capture
              ? () =>
                  capture(
                    `input-invalid-${framework}-${theme}-${focused ? "focus" : "rest"}-${autofill ? "filled" : "normal"}`,
                  )
              : undefined,
          });
          results.push({
            check: "input-error-border",
            framework,
            theme,
            focused,
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
