// Native framework demos against the production docs build. Actions use real
// pointer/keyboard input; state is checked through the public rendered readout.
import assert from "node:assert/strict";

export async function checkHeatmapFrameworks({
  call,
  evaluate,
  wait,
  page,
  results,
}) {
  const demo = '[id$="demo-candles-navigation"] [data-demo-preview]';
  const manual = "(?:Manual view|手动视图|手動表示|Vue manuelle)";
  const following =
    "(?:Following market|正在跟随行情|相場に追従中|Suivi du marché)";
  const seconds = (value) => `(?:^|·)\\s*${value}\\s*(?:s|秒)`;
  const outputMatches = (pattern) =>
    `new RegExp(${JSON.stringify(pattern)}).test(window.__heatmapFrameworkTest?.output?.textContent || '')`;
  const clickButton = async (index) => {
    const point = await evaluate(`(()=>{
      const button=window.__heatmapFrameworkTest.buttons[${index}];
      button.scrollIntoView({block:'center'});
      const rect=button.getBoundingClientRect();
      return {x:rect.x+rect.width/2,y:rect.y+rect.height/2};
    })()`);
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

  for (const framework of ["vue", "angular", "html"]) {
    await page("order-book-heatmap", 1280, framework);
    const mounted =
      framework === "vue"
        ? `${demo} [data-vue-demo][aria-busy="false"]`
        : framework === "angular"
          ? `${demo} [data-angular-demo][aria-busy="false"]`
          : `${demo} minerva-order-book-heatmap`;
    await wait(`document.querySelector(${JSON.stringify(mounted)})`);
    await wait(`(()=>{
      const preview=document.querySelector(${JSON.stringify(demo)});
      return preview?.querySelector('output')?.textContent.includes('30');
    })()`);
    await evaluate(`(()=>{
      const preview=document.querySelector(${JSON.stringify(demo)});
      const deep=(root,selector)=>{
        const own=[...root.querySelectorAll(selector)];
        for(const element of root.querySelectorAll('*')) {
          if(element.shadowRoot) own.push(...deep(element.shadowRoot,selector));
        }
        return own;
      };
      window.__heatmapFrameworkTest={preview,deep,
        buttons:[...preview.querySelectorAll('minerva-button,button')],
        output:preview.querySelector('output')};
      preview.scrollIntoView({block:'center'});
    })()`);
    const expectReadout = async (pattern) => {
      try {
        await wait(outputMatches(pattern));
      } catch (error) {
        const diagnostic = await evaluate(`(()=>{
          const state=window.__heatmapFrameworkTest;
          return {language:document.documentElement.lang,
            readout:state?.output?.textContent,
            source:state?.preview?.querySelector('p')?.textContent,
            buttons:state?.buttons?.map(button=>button.textContent),
            elementView:state?.preview?.querySelector('minerva-order-book-heatmap')?.getView?.(),
            preview:state?.preview?.textContent?.slice(0,1200)};
        })()`);
        throw new Error(
          `Heatmap ${framework} readout did not match ${pattern}: ${JSON.stringify(diagnostic)}`,
          { cause: error },
        );
      }
    };
    await wait(
      `window.__heatmapFrameworkTest.deep(window.__heatmapFrameworkTest.preview,'canvas').some(canvas=>canvas.width>0&&canvas.height>0)`,
    );
    await expectReadout(manual);
    await expectReadout(seconds(30));
    const initial = await evaluate(`(()=>{
      const state=window.__heatmapFrameworkTest;
      return {buttons:state.buttons.map(button=>button.textContent.trim()),
        source:state.preview.querySelector('p')?.textContent.trim(),
        readout:state.output.textContent.trim(),
        canvasCount:state.deep(state.preview,'canvas').length};
    })()`);
    assert.equal(initial.buttons.length, 3, JSON.stringify(initial));
    assert.ok(initial.buttons.every(Boolean), JSON.stringify(initial));
    assert.ok(initial.source?.includes("OHLC"), JSON.stringify(initial));

    await clickButton(0);
    await expectReadout(manual);
    await expectReadout(seconds(10));
    const latest = await evaluate(
      "window.__heatmapFrameworkTest.output.textContent.trim()",
    );
    await clickButton(1);
    await expectReadout(seconds(30));
    await expectReadout(manual);
    await clickButton(2);
    await expectReadout(following);
    const follow = await evaluate(
      "window.__heatmapFrameworkTest.output.textContent.trim()",
    );

    // A real key step also proves the framework's public Slider is wired.
    await evaluate(`(()=>{
      const state=window.__heatmapFrameworkTest;
      state.deep(state.preview,'[role="slider"]')[0].focus();
    })()`);
    for (const type of ["keyDown", "keyUp"]) {
      await call("Input.dispatchKeyEvent", {
        type,
        key: "ArrowRight",
        code: "ArrowRight",
        windowsVirtualKeyCode: 39,
      });
    }
    await wait(
      `window.__heatmapFrameworkTest.output.textContent.includes('5%')`,
    );
    results.push({
      check: "heatmap-framework-navigation",
      framework,
      ...initial,
      latest,
      follow,
      intensityKeyboard: true,
    });
  }
  await evaluate("delete window.__heatmapFrameworkTest");
}
