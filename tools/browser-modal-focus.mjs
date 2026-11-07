import assert from "node:assert/strict";

// Real browsing contexts do not dispatch the same focus events as DOM emulators.
export async function checkModalIframeFocus({
  call,
  evaluate,
  wait,
  page,
  results,
}) {
  await page("modal");
  await wait(
    "[...document.querySelectorAll('[data-demo-preview] button')].some(b=>b.textContent.trim()==='Delete record')",
  );
  await evaluate(`new Promise(resolve=>{
    const frame=document.createElement('iframe');
    frame.id='background-focus-fixture';
    frame.setAttribute('sandbox','');
    frame.srcdoc='<p>Background preview</p>';
    frame.onload=resolve;
    document.body.append(frame);
  })`);
  await evaluate(
    "[...document.querySelectorAll('[data-demo-preview] button')].find(b=>b.textContent.trim()==='Delete record').click()",
  );
  await wait(
    "document.querySelector('[role=dialog][data-state=open]')?.contains(document.activeElement)",
  );
  await call("Runtime.evaluate", {
    expression:
      "document.getElementById('background-focus-fixture').contentWindow.focus()",
    userGesture: true,
  });
  // A browser focus transfer completes after the originating focusout callback.
  await evaluate("new Promise(resolve=>setTimeout(resolve,100))");
  const state = await evaluate(`(()=>{
    const dialog=document.querySelector('[role=dialog][data-state=open]');
    return {trapped:dialog.contains(document.activeElement),active:document.activeElement.tagName,hasFocus:document.hasFocus()};
  })()`);
  assert.equal(state.trapped, true, JSON.stringify(state));
  const position = await evaluate(`(()=>{
    const button=[...document.querySelectorAll('[role=dialog] button')].find(b=>b.textContent.trim()==='Delete');
    const r=button.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};
  })()`);
  for (const type of ["mousePressed", "mouseReleased"]) {
    await call("Input.dispatchMouseEvent", {
      type,
      ...position,
      button: "left",
      buttons: type === "mousePressed" ? 1 : 0,
      clickCount: 1,
    });
  }
  await wait(
    "[...document.querySelectorAll('[role=status]')].some(el=>el.textContent==='Record deleted')",
  );
  await evaluate(
    "document.getElementById('background-focus-fixture').remove()",
  );
  results.push({
    check: "modal-background-iframe-focus",
    ...state,
    firstClick: true,
  });
}
