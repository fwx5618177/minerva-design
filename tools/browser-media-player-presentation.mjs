import assert from "node:assert/strict";

const luminance = (rgb) =>
  rgb.slice(0, 3).reduce((total, value, index) => {
    const channel = value / 255;
    const linear =
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    return total + linear * [0.2126, 0.7152, 0.0722][index];
  }, 0);

/** Test the painted overlay against a white frame, independently of demo footage. */
export async function checkVideoControlContrast({
  call,
  evaluate,
  root,
  label,
}) {
  const snapshot = await evaluate(`(()=>{
    const root=${root}, media=root.querySelector('video');
    const parts=[['time',root.querySelector('[data-part="time"], [data-testid="video-time"]')],['title',root.querySelector('[data-part="title"], span[title]')]];
    root.scrollIntoView({block:'center'});
    const original={root:root.style.cssText,media:media.style.cssText};
    media.style.visibility='hidden';root.style.background='#fff';
    const r=root.getBoundingClientRect();
    const points=parts.map(([name,element])=>{
      if(!element)throw Error('Missing player '+name);
      const t=element.getBoundingClientRect();let opacity=1;
      for(let node=element;node;node=node.parentElement)opacity*=Number(getComputedStyle(node).opacity);
      const c=document.createElement('canvas').getContext('2d');c.fillStyle=getComputedStyle(element).color;c.fillRect(0,0,1,1);
      return {name,x:r.left+2,y:t.top+t.height/2,foreground:[...c.getImageData(0,0,1,1).data],opacity};
    });
    return {original,points};
  })()`);
  try {
    await evaluate(
      "new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))",
    );
    const { data } = await call("Page.captureScreenshot", { format: "png" });
    const backgrounds = await evaluate(`(async()=>{
      const image=new Image();image.src='data:image/png;base64,${data}';await image.decode();
      const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;
      const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);const scale=image.width/window.innerWidth;
      return ${JSON.stringify(snapshot.points)}.map(point=>[...ctx.getImageData(Math.floor(point.x*scale),Math.floor(point.y*scale),1,1).data]);
    })()`);
    const measurements = snapshot.points.map((point, index) => {
      const background = backgrounds[index];
      // Sample fully visible chrome, outside its fade transition. Group opacity
      // would also composite the panel background and cannot be folded into the
      // text alpha after sampling the painted panel.
      assert.ok(
        point.opacity >= 0.999,
        `${label}: ${point.name} is not fully visible`,
      );
      const alpha = point.foreground[3] / 255;
      const foreground = point.foreground
        .slice(0, 3)
        .map((channel, i) => channel * alpha + background[i] * (1 - alpha));
      const a = luminance(foreground),
        b = luminance(background);
      const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      assert.ok(
        contrast >= 4.5,
        `${label}: ${point.name} contrast ${contrast.toFixed(2)}:1 over a bright frame`,
      );
      return { part: point.name, contrast, background, foreground };
    });
    return { check: "media-player-bright-frame-contrast", label, measurements };
  } finally {
    await evaluate(
      `(()=>{const root=${root};root.style.cssText=${JSON.stringify(snapshot.original.root)};root.querySelector('video').style.cssText=${JSON.stringify(snapshot.original.media)};})()`,
    );
  }
}

export async function checkPresentationMedia(evaluate) {
  const media = await evaluate(
    `(()=>{const video=document.querySelector('#demo-video video');return {width:video.videoWidth,height:video.videoHeight,duration:video.duration};})()`,
  );
  assert.ok(
    media.width >= 1280 && media.height >= 720,
    "Documentation footage must be at least 720p: " + JSON.stringify(media),
  );
  assert.ok(
    media.duration >= 30,
    "Documentation footage needs enough duration to demonstrate seeking and resume",
  );
  return { check: "media-player-presentation-media", ...media };
}

export async function checkVideoControlLayout(
  evaluate,
  controls = `document.querySelector('#demo-video [data-part="controls"]')`,
  label = "basic",
) {
  const data = await evaluate(`(()=>{
    const root=${controls};if(!root)throw Error('Missing player controls');
    const r=root.getBoundingClientRect(),style=getComputedStyle(root);
    return {left:r.left+parseFloat(style.paddingLeft),right:r.right-parseFloat(style.paddingRight),buttons:[...root.querySelectorAll('button')].filter(button=>button.getClientRects().length).map(button=>{const b=button.getBoundingClientRect();return {label:button.getAttribute('aria-label'),top:b.top,left:b.left,right:b.right}})};
  })()`);
  const layout = data.buttons;
  assert.ok(layout.length > 0, label + ": video controls must be visible");
  assert.ok(
    layout.every((item) => Math.abs(item.top - layout[0].top) < 1),
    label +
      ": video actions must stay together in one row: " +
      JSON.stringify(layout),
  );
  assert.ok(
    Math.abs(layout[0].left - data.left) <= 1 &&
      Math.abs(layout.at(-1).right - data.right) <= 1,
    label +
      ": transport and display actions must align to opposite edges: " +
      JSON.stringify(data),
  );
  return { check: "media-player-control-layout", label, layout };
}

export async function checkVideoKeyboard({
  call,
  evaluate,
  wait,
  root,
  label,
}) {
  const saved = await evaluate(
    `(()=>{const host=${root},scope=host.shadowRoot||host;const group=scope.matches?.('[role="group"]')?scope:scope.querySelector('[role="group"]');const media=scope.querySelector('video');window.__keyboardMedia=media;window.__keyboardGroup=group;const saved={time:media.currentTime,volume:media.volume,muted:media.muted};media.pause();media.currentTime=2;media.muted=false;media.volume=.4;group.focus();return saved;})()`,
  );
  try {
    await wait(
      "!window.__keyboardMedia.seeking && Math.abs(window.__keyboardMedia.currentTime-2)<.5",
    );
    await evaluate(
      "new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))",
    );
    for (const [key, keyCode] of [
      ["ArrowRight", 39],
      ["ArrowUp", 38],
    ]) {
      await call("Input.dispatchKeyEvent", {
        type: "keyDown",
        key,
        code: key,
        windowsVirtualKeyCode: keyCode,
      });
      await call("Input.dispatchKeyEvent", {
        type: "keyUp",
        key,
        code: key,
        windowsVirtualKeyCode: keyCode,
      });
    }
    await wait(
      "!window.__keyboardMedia.seeking && Math.abs(window.__keyboardMedia.currentTime-7)<.5 && Math.abs(window.__keyboardMedia.volume-.5)<.01",
    );
    return {
      check: "media-player-compact-keyboard",
      label,
      seekSeconds: 5,
      volumeStep: 0.1,
    };
  } finally {
    await evaluate(
      `(()=>{const media=window.__keyboardMedia;media.currentTime=${saved.time};media.volume=${saved.volume};media.muted=${saved.muted};window.__keyboardGroup.blur();delete window.__keyboardMedia;delete window.__keyboardGroup;})()`,
    );
  }
}
