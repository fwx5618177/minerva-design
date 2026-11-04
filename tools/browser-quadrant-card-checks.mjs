// Shared detached card geometry, exercised through the real docs adapters.
import assert from "node:assert/strict";

export async function checkQuadrantCard({
  call,
  evaluate,
  wait,
  page,
  results,
  capture,
}) {
  const installQuery = () =>
    evaluate(`window.__cardQuery=(selector,root=document)=>{
    const found=root.querySelector(selector);if(found)return found;
    for(const el of root.querySelectorAll('*'))if(el.shadowRoot){const found=window.__cardQuery(selector,el.shadowRoot);if(found)return found;}
    return null;
  }`);
  const inspect = async (selector, focus = true) => {
    await installQuery();
    await wait(`window.__cardQuery('${selector}')`);
    if (focus) await evaluate(`window.__cardQuery('${selector}').focus()`);
    await wait(`window.__cardQuery('[data-point-preview]')`);
    await evaluate(
      `window.__cardQuery('[data-point-preview]').parentElement.scrollIntoView({block:'center'})`,
    );
    // A settled pair of frames includes host content and ResizeObserver.
    await evaluate(
      `new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))`,
    );
    const data = await evaluate(`(()=>{
      const card=window.__cardQuery('[data-point-preview]');
      const rect=e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
      const dot=card.querySelector('[data-card-dot]');const style=getComputedStyle(card);
      const point=card.closest('[data-demo-preview]')?.querySelector('.minerva-chart-quadrant-point[data-point-index="'+card.dataset.pointPreview+'"]');
      return {card:rect(card),dot:rect(dot),anchor:point?rect(point):null,host:rect(card.parentElement),padding:style.paddingLeft,align:style.textAlign,background:style.backgroundColor,shadow:style.boxShadow};
    })()`);
    const { card, dot, host } = data;
    assert.ok(card.width > 0 && card.height > 0, JSON.stringify(data));
    assert.ok(
      Math.max(
        card.left - dot.right,
        dot.left - card.right,
        card.top - dot.bottom,
        dot.top - card.bottom,
      ) >= 9.5,
      JSON.stringify(data),
    );
    assert.ok(
      card.left >= host.left + 5.5 && card.right <= host.right - 5.5,
      JSON.stringify(data),
    );
    assert.ok(
      card.top >= host.top + 5.5 && card.bottom <= host.bottom - 5.5,
      JSON.stringify(data),
    );
    if (data.anchor) {
      assert.ok(
        Math.abs((dot.left + dot.right) / 2 - data.anchor.left) < 0.5,
        JSON.stringify(data),
      );
      assert.ok(
        Math.abs((dot.top + dot.bottom) / 2 - data.anchor.top) < 0.5,
        JSON.stringify(data),
      );
    }
    assert.equal(data.padding, "10px");
    assert.equal(data.align, "left");
    return data;
  };
  let lightBackground;
  for (const mode of ["light", "dark"]) {
    await page("quadrant-chart");
    await evaluate(`localStorage.setItem('minerva-docs-theme','${mode}')`);
    await call("Page.reload");
    await wait('document.querySelector("[data-demo-preview]")');
    for (const framework of ["react", "vue", "angular", "html"]) {
      await page("quadrant-chart", 1280, framework);
      const label = {
        react: "React",
        vue: "Vue",
        angular: "Angular",
        html: "HTML",
      }[framework];
      await wait(
        `[...document.querySelectorAll('[role="tab"][aria-selected="true"]')].some(el=>el.textContent.trim()==='${label}')`,
      );
      if (framework === "vue" || framework === "angular")
        await wait(
          `document.querySelector('[data-${framework}-demo][aria-busy="false"]')`,
        );
      const data = await inspect('button[data-point-index="0"]');
      if (framework === "react") {
        if (mode === "light") lightBackground = data.background;
        else assert.notEqual(data.background, lightBackground);
      }
      results.push({
        check: "quadrant-detached-card",
        mode,
        framework,
        ...data,
      });
      await capture(`quadrant-${framework}-${mode}`);
    }
    await page("quadrant-task-board");
    const taskPoint =
      '[id$="demo-basic"] .minerva-chart-quadrant-point[data-point-index="0"]';
    await wait(`document.querySelector('${taskPoint}')`);
    await evaluate(
      `document.querySelector('${taskPoint}').closest('[data-demo-preview]').scrollIntoView({block:'center'})`,
    );
    const at = await evaluate(
      `(()=>{const r=document.querySelector('${taskPoint}').getBoundingClientRect();return {x:r.x,y:r.y};})()`,
    );
    await call("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      ...at,
      buttons: 0,
      button: "none",
    });
    await wait(
      `document.querySelector('[data-point-preview="0"] [data-card-actions] button')`,
    );
    const board = await inspect('button[data-point-index="0"]', false);
    const actions = await evaluate(
      `(()=>{const card=document.querySelector('[data-point-preview="0"]');const r=card.getBoundingClientRect();return [...card.querySelectorAll('[data-card-actions] button')].map(b=>{const box=b.getBoundingClientRect();return {label:b.getAttribute('aria-label'),inside:box.left>=r.left&&box.right<=r.right&&box.top>=r.top&&box.bottom<=r.bottom};});})()`,
    );
    assert.equal(actions.length, 2);
    assert.ok(
      actions.every((action) => action.inside),
      JSON.stringify(actions),
    );
    results.push({
      check: "quadrant-detached-actions",
      mode,
      actions,
      ...board,
    });
    await capture(`quadrant-task-board-${mode}`);
    const edit = await evaluate(
      `(()=>{const b=document.querySelector('[data-point-preview="0"] [data-card-actions] button');const r=b.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`,
    );
    // Cross the real gap, then activate the actual host-rendered edit action.
    await call("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      ...edit,
      buttons: 0,
      button: "none",
    });
    await call("Input.dispatchMouseEvent", {
      type: "mousePressed",
      ...edit,
      buttons: 1,
      button: "left",
      clickCount: 1,
    });
    await call("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      ...edit,
      buttons: 0,
      button: "left",
      clickCount: 1,
    });
    await wait(`document.querySelector('[role="dialog"] input')`);
    assert.ok(
      await evaluate(
        `document.querySelector('[role="dialog"] input').value.length>0`,
      ),
    );
    for (const type of ["keyDown", "keyUp"])
      await call("Input.dispatchKeyEvent", {
        type,
        key: "Escape",
        code: "Escape",
        windowsVirtualKeyCode: 27,
      });
    await wait(`!document.querySelector('[role="dialog"]')`);
    results.push({
      check: "quadrant-detached-edit-action",
      mode,
      opened: true,
      closedWithEscape: true,
    });

    for (const viewport of [390, 1280]) {
      await page("quadrant-chart", viewport);
      const data = await inspect(
        '[id$="demo-bcg"] button[data-point-index="0"]',
      );
      assert.ok(data.dot.width > 30, JSON.stringify(data));
      results.push({
        check: "quadrant-detached-bubble",
        mode,
        viewport,
        ...data,
      });
      await capture(`quadrant-bubble-${viewport}-${mode}`);
    }
  }
}
