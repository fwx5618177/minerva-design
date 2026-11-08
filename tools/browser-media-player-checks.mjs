import assert from "node:assert/strict";

/** Real layout, decoding and user gestures in the production docs, not a DOM mock. */
export async function checkMediaPlayerDocs({
  call,
  evaluate,
  wait,
  page,
  results,
  capture,
}) {
  const click = async (expression) => {
    const point = await evaluate(
      `(()=>{const e=${expression};if(!e)throw Error('Missing player control');e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`,
    );
    await call("Input.dispatchMouseEvent", { type: "mouseMoved", ...point });
    await call("Input.dispatchMouseEvent", {
      type: "mousePressed",
      ...point,
      button: "left",
      buttons: 1,
      clickCount: 1,
    });
    await call("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      ...point,
      button: "left",
      buttons: 0,
      clickCount: 1,
    });
  };
  for (const width of [1440, 390]) {
    await page("media-player", width);
    await wait(
      `document.querySelectorAll('[data-demo-preview] video').length>=8`,
    );
    const layout =
      await evaluate(`([...document.querySelectorAll('[data-demo-preview]')].map(preview=>{
      const style=getComputedStyle(preview), wrapper=preview.firstElementChild;
      const available=preview.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
      const max=parseFloat(wrapper.style.maxWidth)||available;
      return {id:preview.closest('section').id,expected:Math.min(available,max),width:wrapper.getBoundingClientRect().width,scroll:wrapper.scrollWidth,client:wrapper.clientWidth,
        players:[...preview.querySelectorAll('[data-media], [data-minerva="media-player"][data-part="root"]')].map(root=>({width:root.clientWidth,height:root.clientHeight,kind:root.dataset.media||root.dataset.variant}))};
    }))`);
    if (capture)
      await capture(`media-player-${width}`, "#demo-recovery [data-media]");
    for (const demo of layout) {
      assert.ok(
        demo.width >= demo.expected - 1,
        `${width}: collapsed preview ${JSON.stringify(demo)}`,
      );
      assert.ok(
        demo.scroll <= demo.client + 1,
        `${width}: overflow ${JSON.stringify(demo)}`,
      );
      for (const player of demo.players) {
        assert.ok(
          player.width >= Math.min(240, demo.expected) - 2,
          `${width}: collapsed player ${JSON.stringify(demo)}`,
        );
        assert.ok(
          player.height >= 64,
          `${width}: invisible player ${JSON.stringify(demo)}`,
        );
      }
    }
    if (width === 1440) {
      const played = [];
      for (const demo of layout)
        for (let i = 0; i < demo.players.length; i++) {
          const root = `document.querySelectorAll('#${demo.id} [data-media]')[${i}]`;
          const media = `${root}.querySelector('video,audio')`;
          await evaluate(`${root}.scrollIntoView({block:'center'})`);
          await wait(
            `${media}.readyState>=2 && Number.isFinite(${media}.duration)`,
          );
          const src = await evaluate(`${media}.currentSrc`);
          assert.ok(
            src.startsWith("blob:")
              ? demo.id === "demo-streams"
              : new URL(src).pathname.includes("/media-player/"),
            "Docs playback must use local assets or the streaming engine media source: " +
              src,
          );
          if (demo.id === "demo-compact") {
            await wait(`!${media}.paused && ${media}.muted`);
            await evaluate(`${media}.currentTime=0.5`);
          } else {
            await evaluate(`${media}.pause();${media}.currentTime=0.5`);
            await wait(`!${media}.seeking`);
            await click(
              `[...${root}.querySelectorAll('button')].find(b=>['播放','Play'].includes(b.getAttribute('aria-label')))`,
            );
          }
          await wait(`${media}.currentTime>0.8 && !${media}.paused`);
          await evaluate(`${media}.pause()`);
          played.push({ demo: demo.id, src });
        }
      const recovery = `document.querySelector('#demo-recovery')`;
      const recoveryMedia = `${recovery}.querySelector('video')`;
      const recoveryButton = `${recovery}.querySelector('button')`;
      await click(recoveryButton);
      await wait(`${recovery}.querySelector('[role="alert"]')`);
      await click(recoveryButton);
      await wait(
        `${recoveryMedia}.currentSrc.endsWith('/sample.mp4') && ${recoveryMedia}.readyState>=2 && !${recovery}.querySelector('[role="alert"]')`,
      );
      const formats = [];
      for (const format of ["DASH", "FLV", "HLS"]) {
        await click(
          `[...document.querySelectorAll('#demo-streams button')].find(b=>b.textContent.trim()==='${format}')`,
        );
        await wait(
          `document.querySelector('#demo-streams video').readyState>=2 && document.querySelector('#demo-streams [data-engine]').dataset.engine==='${format.toLowerCase()}'`,
        );
        const root = `document.querySelector('#demo-streams [data-media]')`;
        await click(
          `[...${root}.querySelectorAll('button')].find(b=>['播放','Play'].includes(b.getAttribute('aria-label')))`,
        );
        await wait(
          `document.querySelector('#demo-streams video').currentTime>0.3`,
        );
        await evaluate(`document.querySelector('#demo-streams video').pause()`);
        formats.push(format);
      }
      results.push({
        check: "media-player-docs-playback",
        played,
        recovery: true,
        formats,
      });
    }
    results.push({
      check: "media-player-layout",
      viewport: width,
      demos: layout,
    });
  }
  for (const framework of ["vue", "angular", "html"]) {
    await page("media-player", 1440, framework);
    const prefix = framework === "html" ? "wc" : framework;
    await wait(
      `document.querySelector('#${prefix}-demo-captions [data-demo-preview]')`,
    );
    await evaluate(`(()=>{
      const deep=(root,selector)=>{const own=[...root.querySelectorAll(selector)];for(const e of root.querySelectorAll('*'))if(e.shadowRoot)own.push(...deep(e.shadowRoot,selector));return own;};
      window.__mediaDocs={deep,rootOf:m=>m.closest('[data-minerva="media-player"][data-part="root"]')||m.getRootNode().host,items:[]};
    })()`);
    // Native islands render asynchronously; wait for every mounted demo's media.
    await wait(
      `(()=>{const state=window.__mediaDocs;const previews=[...document.querySelectorAll('[data-demo-preview]')];return previews.length>=5&&previews.every(p=>state.deep(p,'video,audio').length>0)})()`,
    );
    const count = await evaluate(
      `(()=>{const state=window.__mediaDocs;state.items=[...document.querySelectorAll('[data-demo-preview]')].flatMap(p=>state.deep(p,'video,audio'));return state.items.length})()`,
    );
    for (let i = 0; i < count; i++) {
      const media = `window.__mediaDocs.items[${i}]`;
      await evaluate(`${media}.scrollIntoView({block:'center'})`);
      await wait(`${media}.readyState>=2`);
      const info = await evaluate(
        `(()=>{const m=${media};const root=window.__mediaDocs.rootOf(m);return {src:m.currentSrc,width:root?.clientWidth??m.clientWidth,height:root?.clientHeight??m.clientHeight}})()`,
      );
      assert.ok(
        new URL(info.src).pathname.includes("/media-player/"),
        JSON.stringify(info),
      );
      assert.ok(
        info.width >= 240 && info.height >= 64,
        framework + ": " + JSON.stringify(info),
      );
      await evaluate(`${media}.pause();${media}.currentTime=.5`);
      await wait(`!${media}.seeking`);
      await click(
        `window.__mediaDocs.deep(window.__mediaDocs.rootOf(${media}).shadowRoot||window.__mediaDocs.rootOf(${media}),'button').find(b=>['播放','Play','Lire','再生'].includes(b.getAttribute('aria-label')))`,
      );
      await wait(`${media}.currentTime>.8&&!${media}.paused`);
      await evaluate(`${media}.pause()`);
    }
    results.push({
      check: "media-player-framework-playback",
      framework,
      played: count,
    });
    await evaluate("delete window.__mediaDocs");
  }
}
