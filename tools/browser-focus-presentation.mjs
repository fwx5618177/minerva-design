import assert from "node:assert/strict";

/** Real input devices: text inputs match :focus-visible even after a mouse click. */
export async function checkFocusPresentation({
  call,
  evaluate,
  wait,
  page,
  results,
  capture,
}) {
  const setup = `(()=>{
    const deep=(root,selector)=>{const own=[...root.querySelectorAll(selector)];for(const el of root.querySelectorAll('*'))if(el.shadowRoot)own.push(...deep(el.shadowRoot,selector));return own;};
    const preview=document.querySelector('[id$="demo-basic"] [data-demo-preview]')||document.querySelector('[data-demo-preview]');
    const field=deep(preview,'input:not([type="hidden"])').find(el=>!el.disabled&&!el.readOnly);
    if(!field)return false;
    const frame=field.closest('[data-part="root"]')||field.parentElement;
    window.__focusPresentation={field,frame};return true;
  })()`;
  const measured = `(()=>{
    const {field,frame}=window.__focusPresentation;
    const inspect=el=>{const s=getComputedStyle(el);const layers=s.boxShadow.split(/,(?![^()]*\\))/);const outer=layers.filter(l=>!l.includes('inset')).map(l=>({values:[...l.matchAll(/(-?\\d*\\.?\\d+)px/g)].map(m=>Number(m[1]))})).filter(l=>l.values.length>=4&&l.values[0]===0&&l.values[1]===0&&l.values[2]===0).map(l=>l.values[3]);return {shadow:s.boxShadow,ring:Math.max(0,...outer),outline:s.outlineStyle,outlineWidth:parseFloat(s.outlineWidth),outlineColor:s.outlineColor,border:s.borderColor};};
    return {field:inspect(field),frame:inspect(frame),focused:field.getRootNode().activeElement===field,modality:getComputedStyle(field).getPropertyValue('--_minerva-focus-ring-width').trim()};
  })()`;
  for (const framework of ["react", "vue", "angular", "html"]) {
    await page("input", 1280, framework);
    await wait(setup);
    const at = await evaluate(
      `(()=>{const el=window.__focusPresentation.field;el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
    );
    for (const type of ["mouseMoved", "mousePressed", "mouseReleased"])
      await call("Input.dispatchMouseEvent", {
        type,
        ...at,
        button: type === "mouseMoved" ? "none" : "left",
        buttons: type === "mousePressed" ? 1 : 0,
        ...(type === "mouseMoved" ? {} : { clickCount: 1 }),
      });
    await evaluate("new Promise(r=>setTimeout(r,200))");
    let state = await evaluate(measured);
    assert.equal(state.focused, true, JSON.stringify({ framework, state }));
    assert.equal(
      state.frame.ring,
      0,
      JSON.stringify({ framework, pointer: state }),
    );
    assert.equal(
      state.field.ring,
      0,
      JSON.stringify({ framework, pointer: state }),
    );
    assert.ok(
      state.field.outlineColor === "rgba(0, 0, 0, 0)" ||
        state.field.outlineWidth === 0 ||
        state.field.outline === "none",
      JSON.stringify({ framework, pointer: state }),
    );
    results.push({ check: "pointer-focus-single-frame", framework, ...state });
    const before = await evaluate("window.__focusPresentation.field.value");
    for (const type of ["keyDown", "keyUp"])
      await call("Input.dispatchKeyEvent", {
        type,
        key: " ",
        code: "Space",
        windowsVirtualKeyCode: 32,
        ...(type === "keyDown" ? { text: " ", unmodifiedText: " " } : {}),
      });
    await evaluate("new Promise(r=>setTimeout(r,200))");
    state = await evaluate(measured);
    assert.equal(
      await evaluate("window.__focusPresentation.field.value"),
      before + " ",
    );
    assert.equal(
      state.frame.ring,
      0,
      JSON.stringify({ framework, textEntry: state }),
    );
    results.push({
      check: "pointer-text-entry-stays-quiet",
      framework,
      ...state,
    });
    // Shift+Tab then Tab re-enters the field using trusted keyboard events.
    for (const key of [
      { key: "Tab", modifiers: 8 },
      { key: "Tab", modifiers: 0 },
    ])
      for (const type of ["keyDown", "keyUp"])
        await call("Input.dispatchKeyEvent", {
          type,
          ...key,
          code: "Tab",
          windowsVirtualKeyCode: 9,
        });
    await evaluate("new Promise(r=>setTimeout(r,200))");
    state = await evaluate(measured);
    assert.equal(state.focused, true, JSON.stringify({ framework, state }));
    assert.equal(
      state.frame.ring,
      2,
      JSON.stringify({ framework, keyboard: state }),
    );
    assert.equal(
      state.field.ring,
      0,
      JSON.stringify({ framework, keyboard: state }),
    );
    const contrast = await evaluate(`(()=>{
      const frame=window.__focusPresentation.frame,s=getComputedStyle(frame);
      const layer=s.boxShadow.split(/,(?![^()]*\\))/).find(l=>!l.includes('inset'))?.trim();
      const color=layer?.match(/^(.*?)\\s+-?\\d*\\.?\\d+px/)?.[1];
      if(!color)throw Error('Keyboard ring has no painted color');
      let background='white';for(let el=frame;el;el=el.parentElement||el.getRootNode().host){const bg=getComputedStyle(el).backgroundColor;if(bg!=='transparent'&&bg!=='rgba(0, 0, 0, 0)'){background=bg;break;}}
      const canvas=document.createElement('canvas');canvas.width=canvas.height=1;const ctx=canvas.getContext('2d');ctx.fillStyle=background;ctx.fillRect(0,0,1,1);const bg=[...ctx.getImageData(0,0,1,1).data];ctx.fillStyle=color;ctx.fillRect(0,0,1,1);const fg=[...ctx.getImageData(0,0,1,1).data];
      const lum=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);const a=lum(bg),b=lum(fg);return {color,background,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
    })()`);
    assert.ok(contrast.ratio >= 3, JSON.stringify({ framework, contrast }));
    results.push({
      check: "keyboard-focus-single-ring",
      framework,
      contrast,
      ...state,
    });
  }

  await page("styling", 1280, "react");
  await wait(
    `document.querySelector('[id$="demo-focus-treatment"] [data-minerva="date-picker"] input')`,
  );
  const click = async (expression) => {
    const at = await evaluate(
      `(()=>{const el=(${expression});el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
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
  const date = `document.querySelector('[id$="demo-focus-treatment"] [data-minerva="date-picker"] input')`;
  await click(date);
  await wait(
    `document.querySelector('[data-minerva="date-picker"][data-part="content"][data-state="open"]')`,
  );
  await evaluate(
    `(()=>{const field=${date};window.__focusPresentation={field,frame:field.closest('[data-minerva="input"][data-part="root"]')};})()`,
  );
  await evaluate("new Promise(r=>setTimeout(r,200))");
  let state = await evaluate(measured);
  assert.equal(state.frame.ring, 0, JSON.stringify(state));
  assert.equal(state.field.ring, 0, JSON.stringify(state));
  results.push({ check: "date-picker-pointer-single-frame", ...state });
  if (capture) await capture("focus-date-picker-pointer");
  for (const type of ["keyDown", "keyUp"])
    await call("Input.dispatchKeyEvent", {
      type,
      key: "Escape",
      code: "Escape",
      windowsVirtualKeyCode: 27,
    });
  await click(
    `document.querySelector('[id$="demo-focus-treatment"] [data-demo-preview] button')`,
  );
  await wait(
    `document.querySelector('[data-minerva="command-dialog"][data-part="input"]')`,
  );
  await evaluate(
    `(()=>{const field=document.querySelector('[data-minerva="command-dialog"][data-part="input"]');window.__focusPresentation={field,frame:field.closest('[data-part="search"]')};})()`,
  );
  await evaluate("new Promise(r=>setTimeout(r,200))");
  state = await evaluate(measured);
  assert.equal(state.focused, true);
  assert.equal(state.frame.ring, 0, JSON.stringify(state));
  assert.equal(state.field.ring, 0, JSON.stringify(state));
  results.push({ check: "command-pointer-autofocus-single-frame", ...state });
  if (capture) await capture("focus-command-pointer");
  for (const type of ["keyDown", "keyUp"])
    await call("Input.dispatchKeyEvent", {
      type,
      key: "ArrowDown",
      code: "ArrowDown",
      windowsVirtualKeyCode: 40,
    });
  await evaluate("new Promise(r=>setTimeout(r,200))");
  state = await evaluate(measured);
  assert.equal(state.frame.ring, 2, JSON.stringify(state));
  assert.equal(state.field.ring, 0, JSON.stringify(state));
  results.push({ check: "command-keyboard-single-ring", ...state });
  for (const type of ["keyDown", "keyUp"])
    await call("Input.dispatchKeyEvent", {
      type,
      key: "Escape",
      code: "Escape",
      windowsVirtualKeyCode: 27,
    });
}
