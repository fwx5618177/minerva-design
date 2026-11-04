// Real pointer capture and React card handoff on the production docs demo.
// `call` is the isolated Chrome session owned by browser-ui-issues.mjs.
import assert from "node:assert/strict";

export async function checkQuadrantPointer({
  call,
  evaluate,
  wait,
  page,
  results,
}) {
  // Record the real painted glyph bounds, including font, alignment and locale.
  await evaluate(`(()=>{
    const original=CanvasRenderingContext2D.prototype.fillText;
    window.__quadrantLabelPaint=[];
    window.__restoreQuadrantLabelPaint=()=>{CanvasRenderingContext2D.prototype.fillText=original;};
    CanvasRenderingContext2D.prototype.fillText=function(text,x,y,...rest){
      const result=original.call(this,text,x,y,...rest);
      const m=this.measureText(String(text));
      window.__quadrantLabelPaint.push({canvas:this.canvas,text:String(text),x:x-m.actualBoundingBoxLeft,y:y-m.actualBoundingBoxAscent,width:m.actualBoundingBoxLeft+m.actualBoundingBoxRight,height:m.actualBoundingBoxAscent+m.actualBoundingBoxDescent});
      return result;
    };
  })()`);
  await page("quadrant-chart");
  const demo = '[id$="demo-draggable"] [data-demo-preview]';
  await wait(
    `document.querySelector('${demo} .minerva-chart-quadrant-point[data-point-index="3"]')`,
  );
  await evaluate(`(()=>{
    const preview=document.querySelector('${demo}');
    const stage=preview.querySelector('.minerva-chart-stage');
    stage.scrollIntoView({block:'center'});
    window.__quadrantTest={preview,stage,pointerId:null,lost:[],events:[]};
    for(const type of ['pointerdown','pointermove','pointerup','pointercancel','gotpointercapture','lostpointercapture'])
      stage.addEventListener(type,e=>{
        window.__quadrantTest.events.push({type,id:e.pointerId,buttons:e.buttons,x:e.clientX,y:e.clientY,captured:stage.hasPointerCapture(e.pointerId),dragging:!!preview.querySelector('[data-dragging]')});
        window.__quadrantTest.events=window.__quadrantTest.events.slice(-24);
      });
    window.addEventListener('blur',()=>window.__quadrantTest.events.push({type:'window-blur'}));
    stage.addEventListener('pointerdown',e=>window.__quadrantTest.downId=e.pointerId);
    stage.addEventListener('gotpointercapture',e=>window.__quadrantTest.pointerId=e.pointerId);
    stage.addEventListener('lostpointercapture',e=>window.__quadrantTest.lost.push(e.pointerId));
  })()`);
  const point = (index) =>
    evaluate(`(()=>{
    const r=window.__quadrantTest.preview.querySelector('.minerva-chart-quadrant-point[data-point-index="${index}"]').getBoundingClientRect();
    return {x:r.x,y:r.y};
  })()`);
  const mouse = (type, at, buttons = 0) =>
    call("Input.dispatchMouseEvent", {
      type,
      ...at,
      buttons,
      button: type === "mouseMoved" && !(buttons & 1) ? "none" : "left",
      ...(type === "mouseMoved" ? {} : { clickCount: 1 }),
    });
  const hover = async (index) => {
    await mouse("mouseMoved", await point(index));
    await wait(
      `window.__quadrantTest.preview.querySelector('[data-point-preview="${index}"]:not([data-dragging])')`,
    );
  };
  const idle = async () => {
    const state =
      await evaluate(`(()=>{const {preview,stage}=window.__quadrantTest;return {
      dragging:!!preview.querySelector('[data-dragging]'),cursor:stage.style.cursor,
      marks:[...preview.querySelectorAll('[data-drag-mark]')].filter(e=>getComputedStyle(e).display!=='none').length
    };})()`);
    assert.equal(state.dragging, false);
    assert.notEqual(state.cursor, "grabbing");
    assert.equal(state.marks, 0);
  };

  await wait(
    `window.__quadrantLabelPaint.some(r=>r.width>0&&r.height>0&&r.canvas.closest('.minerva-chart-stage')===window.__quadrantTest.stage&&r.text===window.__quadrantTest.preview.querySelector('.minerva-chart-quadrant-point[data-point-index="0"]').dataset.label)`,
  );
  const textTarget = await evaluate(`(()=>{
    const {stage,preview}=window.__quadrantTest;
    const label=preview.querySelector('.minerva-chart-quadrant-point[data-point-index="0"]').dataset.label;
    const row=window.__quadrantLabelPaint.findLast(r=>r.text===label&&r.canvas.closest('.minerva-chart-stage')===stage);
    if(!row) throw Error('No painted task label found');
    const rect=row.canvas.getBoundingClientRect();
    window.__restoreQuadrantLabelPaint();
    return {x:rect.x+row.x+row.width*.8,y:rect.y+row.y+row.height/2};
  })()`);
  const dot = await point(0);
  assert.ok(Math.hypot(textTarget.x - dot.x, textTarget.y - dot.y) > 20);
  await mouse("mouseMoved", textTarget);
  await wait(
    `window.__quadrantTest.preview.querySelector('[data-point-preview="0"]')`,
  );
  await mouse("mouseMoved", { x: textTarget.x + 1, y: textTarget.y });
  await evaluate(`new Promise(resolve=>setTimeout(resolve,220))`);
  assert.equal(
    await evaluate(
      `window.__quadrantTest.preview.querySelector('[data-point-preview]')?.dataset.pointPreview`,
    ),
    "0",
  );
  results.push({
    check: "quadrant-painted-label-hover",
    point: 0,
    stable: true,
  });

  // Release outside the stage without a move crossing the 3px threshold.
  await hover(0);
  let at = await point(0);
  await mouse("mousePressed", at, 1);
  assert.equal(
    await evaluate(
      `window.__quadrantTest.stage.hasPointerCapture(window.__quadrantTest.downId)`,
    ),
    true,
  );
  await mouse("mouseMoved", { x: at.x + 1, y: at.y + 1 }, 1);
  const outside = await evaluate(
    `(()=>{const r=window.__quadrantTest.stage.getBoundingClientRect();return {x:r.right+10,y:r.top+10};})()`,
  );
  await mouse("mouseReleased", outside);
  await hover(3);
  await idle();
  results.push({
    check: "quadrant-outside-release",
    captureAtPress: true,
    hover: 3,
  });

  // Start a trusted mouse drag, then explicitly revoke real browser capture.
  await hover(0);
  at = await point(0);
  await mouse("mousePressed", at, 1);
  await mouse("mouseMoved", { x: at.x + 24, y: at.y + 8 }, 1);
  await mouse("mouseMoved", { x: at.x + 30, y: at.y + 10 }, 1);
  await wait(
    `window.__quadrantTest.pointerId!==null && window.__quadrantTest.stage.hasPointerCapture(window.__quadrantTest.pointerId) && window.__quadrantTest.preview.querySelector('[data-dragging]')`,
  );
  await evaluate(
    `window.__quadrantTest.stage.releasePointerCapture(window.__quadrantTest.pointerId)`,
  );
  await mouse("mouseMoved", { x: at.x + 32, y: at.y + 10 }, 1);
  await wait(
    `window.__quadrantTest.lost.includes(window.__quadrantTest.pointerId)`,
  );
  await mouse("mouseReleased", { x: at.x + 32, y: at.y + 10 });
  await hover(3);
  await idle();
  results.push({ check: "quadrant-native-capture-loss", hover: 3 });

  // A linger bridge to card actions must yield as soon as another dot is hit.
  await hover(0);
  const body = await evaluate(
    `(()=>{const r=window.__quadrantTest.preview.querySelector('[data-card-content]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`,
  );
  await mouse("mouseMoved", body);
  await mouse("mouseMoved", await point(3));
  assert.equal(
    await evaluate(
      `window.__quadrantTest.preview.querySelector('[data-point-preview]')?.dataset.pointPreview`,
    ),
    "3",
  );
  results.push({ check: "quadrant-card-handoff", hover: 3 });

  // Ordinary drop still updates the controlled demo and retires its preview.
  await hover(0);
  at = await point(0);
  await mouse("mousePressed", at, 1);
  const to = { x: at.x + 30, y: at.y + 20 };
  await mouse("mouseMoved", to, 1);
  await mouse("mouseReleased", to);
  await wait(
    `(()=>{const r=window.__quadrantTest.preview.querySelector('.minerva-chart-quadrant-point[data-point-index="0"]').getBoundingClientRect();return Math.hypot(r.x-${at.x},r.y-${at.y})>3;})()`,
  );
  await wait(
    `![...window.__quadrantTest.preview.querySelectorAll('[data-drag-mark]')].some(e=>getComputedStyle(e).display!=='none')`,
  );
  await hover(3);
  await idle();
  results.push({ check: "quadrant-normal-drop", hover: 3 });
}
