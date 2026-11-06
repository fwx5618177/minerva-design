// Exercise the public chart engine through the production docs demo in Chrome.
import assert from "node:assert/strict";

export async function checkChartHoverPerformance({
  call,
  evaluate,
  wait,
  page,
  results,
}) {
  await page("chart-performance");
  const run = '[data-testid="chart-hover-burst-run"]';
  const result = '[data-testid="chart-hover-burst-result"]';
  await wait(`document.querySelector('${run}:not(:disabled)')`);
  const at = await evaluate(`(()=>{
    const button=document.querySelector('${run}');
    button.scrollIntoView({block:'center'});
    const rect=button.getBoundingClientRect();
    return {x:rect.x+rect.width/2,y:rect.y+rect.height/2};
  })()`);
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
  await wait(`document.querySelector('${result}')`);
  const measured = await evaluate(`(()=>{
    const {dataset:d}=document.querySelector('${result}');
    return {moves:Number(d.moves),hitNotifications:Number(d.hitNotifications),tooltipRenders:Number(d.tooltipRenders),elapsed:Number(d.elapsed),lastPoint:Number(d.lastPoint)};
  })()`);
  assert.equal(measured.moves, 240);
  assert.equal(measured.hitNotifications, 1);
  assert.equal(measured.tooltipRenders, 1);
  assert.equal(measured.lastPoint, 2);
  assert.ok(Number.isFinite(measured.elapsed) && measured.elapsed >= 0);
  results.push({ check: "cartesian-hover-burst", ...measured });
}
