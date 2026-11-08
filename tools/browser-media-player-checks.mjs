import assert from "node:assert/strict";
import {
  checkPresentationMedia,
  checkVideoKeyboard,
  checkVideoControlLayout,
  checkVideoControlContrast,
} from "./browser-media-player-presentation.mjs";

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
  for (const width of [1440, 1024, 768, 390]) {
    await page("media-player", width);
    await wait(
      `document.querySelectorAll('[data-demo-preview] video').length>=8`,
    );
    await wait(`document.querySelector('#demo-video video')?.readyState>=2`);
    for (const [variant, root] of [
      [
        "basic",
        `document.querySelector('#demo-video [data-minerva="media-player"][data-part="root"]')`,
      ],
      ["advanced", `document.querySelector('#demo-desktop [data-media]')`],
    ]) {
      results.push(
        await checkVideoControlContrast({
          call,
          evaluate,
          root,
          label: `${variant}-${width}`,
        }),
      );
    }
    if (width === 1440) results.push(await checkPresentationMedia(evaluate));
    results.push(
      await checkVideoControlLayout(evaluate, undefined, `react-${width}`),
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
    if (capture)
      await capture(
        `media-player-basic-${width}`,
        '#demo-video [data-minerva="media-player"][data-part="root"]',
      );
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
      const qualityRoot = `document.querySelector('#demo-quality')`;
      const qualityMedia = `${qualityRoot}.querySelector('video')`;
      await evaluate(`${qualityMedia}.pause();${qualityMedia}.currentTime=12`);
      await wait(`!${qualityMedia}.seeking`);
      const renditions = [];
      for (const height of [360, 720]) {
        await click(
          `[...${qualityRoot}.querySelectorAll('button')].find(b=>['设置','Settings'].includes(b.getAttribute('aria-label')))`,
        );
        await wait(`${qualityRoot}.querySelector('[role="menu"]')`);
        await click(
          `[...${qualityRoot}.querySelectorAll('[role="menuitem"]')].find(b=>/清晰度|Quality/.test(b.textContent))`,
        );
        await wait(`${qualityRoot}.querySelector('[role="menuitemradio"]')`);
        await click(
          `[...${qualityRoot}.querySelectorAll('[role="menuitemradio"]')].find(b=>b.textContent.includes('${height}p'))`,
        );
        await wait(
          `${qualityMedia}.videoHeight===${height} && ${qualityMedia}.readyState>=2 && !${qualityMedia}.seeking`,
        );
        const current = await evaluate(`${qualityMedia}.currentTime`);
        assert.ok(
          Math.abs(current - 12) < 1,
          "Quality switching must preserve playback position",
        );
        renditions.push({ height, current });
      }
      results.push({ check: "media-player-docs-quality", renditions });
    }
    results.push({
      check: "media-player-layout",
      viewport: width,
      demos: layout,
    });
    if (width === 390)
      results.push(
        await checkVideoKeyboard({
          call,
          evaluate,
          wait,
          root: `document.querySelector('#demo-video [data-part="root"]')`,
          label: "react-390",
        }),
      );
  }
  const originalTheme = await evaluate(
    "localStorage.getItem('minerva-docs-theme')",
  );
  try {
    await evaluate("localStorage.setItem('minerva-docs-theme','dark')");
    for (const width of [1440, 390]) {
      await page("media-player", width);
      await call("Page.reload");
      await wait(`document.querySelector('#demo-video video')?.readyState>=2`);
      for (const [variant, root] of [
        [
          "basic",
          `document.querySelector('#demo-video [data-minerva="media-player"][data-part="root"]')`,
        ],
        ["advanced", `document.querySelector('#demo-desktop [data-media]')`],
      ])
        results.push(
          await checkVideoControlContrast({
            call,
            evaluate,
            root,
            label: `${variant}-dark-${width}`,
          }),
        );
      results.push(
        await checkVideoControlLayout(
          evaluate,
          undefined,
          `react-dark-${width}`,
        ),
      );
      if (capture)
        await capture(
          `media-player-basic-dark-${width}`,
          '#demo-video [data-minerva="media-player"][data-part="root"]',
        );
    }
  } finally {
    await evaluate(
      originalTheme === null
        ? "localStorage.removeItem('minerva-docs-theme')"
        : `localStorage.setItem('minerva-docs-theme',${JSON.stringify(originalTheme)})`,
    );
    await call("Page.reload");
    await wait(`document.querySelector('#demo-video video')?.readyState>=2`);
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
    await call("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await evaluate(
      "new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))",
    );
    const videos = await evaluate(
      `window.__mediaDocs.items.map((media,index)=>media.tagName==='VIDEO'?index:null).filter(index=>index!==null)`,
    );
    for (const index of videos) {
      const host = `window.__mediaDocs.rootOf(window.__mediaDocs.items[${index}])`;
      const controls = `window.__mediaDocs.deep(${host}.shadowRoot||${host},'[data-part="controls"], [part~="controls"]')[0]`;
      results.push(
        await checkVideoControlLayout(
          evaluate,
          controls,
          `${framework}-390-${index}`,
        ),
      );
    }
    if (videos.length)
      results.push(
        await checkVideoKeyboard({
          call,
          evaluate,
          wait,
          root: `window.__mediaDocs.rootOf(window.__mediaDocs.items[${videos[0]}])`,
          label: `${framework}-390`,
        }),
      );
    await evaluate("delete window.__mediaDocs");
  }
}
