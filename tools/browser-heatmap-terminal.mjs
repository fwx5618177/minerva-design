import assert from "node:assert/strict";

export async function checkHeatmapTerminal({
  call,
  evaluate,
  wait,
  page,
  results,
  capture,
}) {
  const root = '[data-testid="heatmap-terminal"]';
  const click = async (selector) => {
    const at = await evaluate(
      `(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`,
    );
    await call("Input.dispatchMouseEvent", { type: "mouseMoved", ...at });
    await call("Input.dispatchMouseEvent", {
      type: "mousePressed",
      ...at,
      button: "left",
      buttons: 1,
      clickCount: 1,
    });
    await call("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      ...at,
      button: "left",
      buttons: 0,
      clickCount: 1,
    });
  };
  for (const width of [1680, 390]) {
    await page("order-book-heatmap", width);
    await wait(`document.querySelector('${root}')`);
    await evaluate(
      `document.querySelector('${root}').scrollIntoView({block:'start'})`,
    );
    await wait(
      `[...document.querySelectorAll('${root} strong[data-metric]')].length===6 && [...document.querySelectorAll('${root} strong[data-metric]')].every(e=>!e.textContent.includes('—'))`,
    );
    await wait(
      `document.querySelector('${root} .minerva-orderbook-heatmap')?.dataset.renderer`,
    );
    const layout = await evaluate(
      `(()=>{const e=document.querySelector('${root}');const r=e.getBoundingClientRect();return {width:r.width,scroll:e.scrollWidth,client:e.clientWidth,sideBySide:e.querySelector('[data-testid="heatmap-terminal-chart"]').getBoundingClientRect().right<=e.querySelector('[data-testid="heatmap-terminal-ladder"]').getBoundingClientRect().left,renderer:e.querySelector('.minerva-orderbook-heatmap').dataset.renderer,metrics:[...e.querySelectorAll('strong[data-metric]')].map(n=>n.textContent),overflow:[...e.querySelectorAll('*')].filter(n=>n.getBoundingClientRect().right>r.right+1).map(n=>({tag:n.tagName,cls:n.className,text:n.textContent.slice(0,60),width:n.getBoundingClientRect().width})).slice(0,20),ladder:!!e.querySelector('[data-testid="heatmap-terminal-ladder"] canvas')};})()`,
    );
    await evaluate(
      `new Promise(resolve=>{document.querySelector('[data-testid="heatmap-terminal-ladder"]').scrollIntoView({block:'center'});requestAnimationFrame(()=>requestAnimationFrame(resolve));})`,
    );
    await evaluate(
      `document.querySelector('${root}').scrollIntoView({block:'start'})`,
    );
    await capture(`heatmap-terminal-${width}`, root);
    assert.ok(layout.scroll <= layout.client + 1, JSON.stringify(layout));
    assert.ok(layout.ladder);
    assert.equal(layout.sideBySide, width === 1680);

    await click(`${root} [role="combobox"]`);
    await wait(`document.querySelector('[role="listbox"] [role="option"]')`);
    const popup = await evaluate(
      `(()=>{const e=document.querySelector('[role="listbox"]');return {theme:e.closest('[data-theme]')?.getAttribute('data-theme'),color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor};})()`,
    );
    assert.equal(popup.theme, "dark", JSON.stringify(popup));
    const palette = await evaluate(
      `document.querySelector('[role="listbox"] [role="option"]:last-child').textContent.trim()`,
    );
    await click('[role="listbox"] [role="option"]:last-child');
    await wait(
      `document.querySelector('${root} [role="combobox"]').textContent.includes(${JSON.stringify(palette)})`,
    );
    await click(`${root} [data-testid="heatmap-live"]`);
    const pixels = async () =>
      evaluate(
        `new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>{const canvases=document.querySelectorAll('${root} .minerva-orderbook-heatmap > canvas');const canvas=canvases[canvases.length-1];const data=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;let hash=2166136261;for(let i=0;i<data.length;i++) hash=Math.imul(hash^data[i],16777619);resolve(hash>>>0);})))`,
      );
    await wait(
      `document.querySelector('[data-testid="heatmap-live"] input').checked===false`,
    );
    const withCandles = await pixels();
    await click('[data-testid="heatmap-show-candles"]');
    const withoutCandles = await pixels();
    assert.notEqual(
      withCandles,
      withoutCandles,
      "Candle control must change rendered chart pixels",
    );
    await click('[data-testid="heatmap-show-candles"]');

    const navigator = '[data-testid="heatmap-history-navigator"]';
    await evaluate(
      `document.querySelector('${navigator} [role="slider"]').focus()`,
    );
    await call("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "ArrowRight",
      code: "ArrowRight",
      windowsVirtualKeyCode: 39,
    });
    await call("Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "ArrowRight",
      code: "ArrowRight",
      windowsVirtualKeyCode: 39,
    });
    await wait(
      `document.querySelector('${navigator}').dataset.follow==='false'`,
    );
    await click('[data-testid="heatmap-follow"]');
    await wait(
      `document.querySelector('${navigator}').dataset.follow==='true'`,
    );
    await evaluate(
      `document.querySelector('${root}').scrollIntoView({block:'start'})`,
    );
    await evaluate(
      `new Promise(resolve=>{document.querySelector('[data-testid="heatmap-terminal-ladder"]').scrollIntoView({block:'center'});requestAnimationFrame(()=>requestAnimationFrame(resolve));})`,
    );
    await evaluate(
      `document.querySelector('${root}').scrollIntoView({block:'start'})`,
    );
    await capture(`heatmap-terminal-${width}`, root);
    results.push({
      check: "heatmap-terminal",
      width,
      ...layout,
      navigation: true,
      candlePixels: { withCandles, withoutCandles },
      palette,
      popup,
    });
    // Reload through another route so each viewport gets a fresh engine lifecycle.
    await page("design-presets", width);
  }
}
