import assert from "node:assert/strict";

export async function checkTablePagination({
  call,
  evaluate,
  wait,
  page,
  results,
  capture,
}) {
  const click = async (expression) => {
    const at = await evaluate(
      `(()=>{const el=${expression};el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
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
  for (const framework of ["react", "vue", "angular", "html"]) {
    for (const width of [1280, 390]) {
      await page("table", width, framework);
      await wait(`(()=>{
        const deep=(root,selector)=>{const own=[...root.querySelectorAll(selector)];for(const el of root.querySelectorAll('*'))if(el.shadowRoot)own.push(...deep(el.shadowRoot,selector));return own;};
        const frame=document.querySelector(${JSON.stringify(framework === "angular" ? "[data-angular-demo]" : '[id$="demo-pagination"] [data-demo-preview]')});
        if(!frame)return false;
        const trigger=deep(frame,'[role="combobox"]').find(el=>el.tagName==='BUTTON');
        const table=deep(frame,'table')[0];
        if(!trigger||!table||table.querySelectorAll('tbody tr').length!==5||!table.querySelector('tbody td')?.textContent.trim())return false;
        window.__tablePagination={deep,frame,trigger,table};return true;
      })()`);
      const geometry = await evaluate(
        `(()=>{const {trigger,frame}=window.__tablePagination;const r=trigger.getBoundingClientRect(), f=frame.getBoundingClientRect(),s=getComputedStyle(trigger);return {tag:trigger.tagName,width:r.width,height:r.height,left:r.left,right:r.right,frame:{left:f.left,right:f.right},visibility:s.visibility,pageWidth:document.documentElement.scrollWidth,viewport:innerWidth}})()`,
      );
      assert.ok(
        geometry.width > 0 && geometry.height > 0,
        JSON.stringify({ framework, width, geometry }),
      );
      assert.ok(
        geometry.left >= geometry.frame.left - 1 &&
          geometry.right <= geometry.frame.right + 1,
        JSON.stringify({ framework, width, geometry }),
      );
      assert.ok(
        geometry.pageWidth <= width,
        JSON.stringify({ framework, width, geometry }),
      );
      await click("window.__tablePagination.trigger");
      await wait(
        `(()=>{const {deep}=window.__tablePagination;const option=deep(document,'[role="option"],minerva-option').find(el=>/^20(?:\\s|$)/.test(el.textContent.trim())&&el.getBoundingClientRect().height>0);if(!option)return false;window.__tablePagination.option=option;return true;})()`,
      );
      await wait(
        `(()=>{const boxes=window.__tablePagination.deep(document,'[role="listbox"]').filter(el=>el.getBoundingClientRect().height>0);return boxes.length>0&&boxes.every(el=>getComputedStyle(el).opacity==='1'&&el.getAnimations().every(animation=>animation.playState!=='running'));})()`,
      );
      if (capture) await capture(`table-pagination-${framework}-${width}`);
      await click("window.__tablePagination.option");
      await wait(
        "window.__tablePagination.table.querySelectorAll('tbody tr').length===20",
      );
      await wait(
        "window.__tablePagination.trigger.getAttribute('aria-expanded')==='false'",
      );
      await click("window.__tablePagination.trigger");
      await wait(
        "window.__tablePagination.trigger.getAttribute('aria-expanded')==='true'",
      );
      for (const type of ["keyDown", "keyUp"])
        await call("Input.dispatchKeyEvent", {
          type,
          key: "Escape",
          code: "Escape",
          windowsVirtualKeyCode: 27,
        });
      await wait(
        "window.__tablePagination.trigger.getAttribute('aria-expanded')==='false'",
      );
      assert.equal(
        await evaluate(
          "window.__tablePagination.trigger.getRootNode().activeElement===window.__tablePagination.trigger",
        ),
        true,
        `${framework}: Escape restores combobox focus`,
      );
      assert.equal(
        await evaluate(
          "window.__tablePagination.table.querySelectorAll('tbody tr').length",
        ),
        20,
      );
      results.push({
        check: "table-page-size-selection",
        framework,
        rows: 20,
        ...geometry,
        triggerWidth: geometry.width,
        width,
      });
      // Width changes keep the same routed component mounted. Restore its
      // initial size through the UI so the next viewport tests a real change.
      await click("window.__tablePagination.trigger");
      await wait(
        `(()=>{const {deep}=window.__tablePagination;const option=deep(document,'[role="option"],minerva-option').find(el=>/^5(?:\\s|$)/.test(el.textContent.trim())&&el.getBoundingClientRect().height>0);if(!option)return false;window.__tablePagination.option=option;return true;})()`,
      );
      await click("window.__tablePagination.option");
      await wait(
        "window.__tablePagination.table.querySelectorAll('tbody tr').length===5",
      );
    }
  }
}
