const assert = require("node:assert/strict");
const automator = require("miniprogram-automator");
const watchdog = setTimeout(() => {
  console.error(
    "WeChat automation RPC timed out; check DevTools account/runtime readiness. No passing result.",
  );
  process.exit(1);
}, 45000);
(async () => {
  const mini = process.env.WECHAT_WS_ENDPOINT
    ? await automator.connect({ wsEndpoint: process.env.WECHAT_WS_ENDPOINT })
    : await automator.launch({
        projectPath: __dirname,
        cliPath:
          process.env.WECHAT_CLI ||
          "/Applications/wechatwebdevtools.app/Contents/MacOS/cli",
        port: 9420,
        trustProject: true,
        timeout: 45000,
      });
  try {
    await mini.reLaunch("/pages/index/index");
    const page = await mini.currentPage();
    await page.waitFor("#increment");
    const component = async (id) => {
      const element = await page.$(id);
      assert.ok(element, `${id} exists`);
      return element;
    };
    await (await (await component("#increment")).$("button")).tap();
    assert.equal(await page.data("count"), 1);
    await (
      await (await component("#controlled-input")).$("input")
    ).input("hello");
    assert.equal(await page.data("text"), "HELLO");
    await (await (await component("#locked-switch")).$("switch")).tap();
    assert.equal(await page.data("switchEvents"), 0);
    const choice = await component("#choice");
    await (await choice.$(".mn-select-trigger")).tap();
    const options = await choice.$$(".mn-option");
    await options[1].tap();
    assert.equal(await page.data("choice"), "a");
    await options[2].tap();
    assert.equal(await page.data("choice"), "b");
    await (await (await component("#open-modal")).$("button")).tap();
    assert.equal(await page.data("open"), true);
    await (await (await component("#dialog")).$(".mn-modal-close")).tap();
    assert.equal(await page.data("open"), false);
    await (await (await component("#toggle-theme")).$("button")).tap();
    assert.equal(await page.data("theme"), "dark");
    await (await (await component("#retry-state")).$("button")).tap();
    assert.equal(await page.data("count"), 2);
    console.log(
      JSON.stringify({
        runtime: "WeChat DevTools",
        path: page.path,
        passed: [
          "button",
          "controlled-input",
          "disabled-switch",
          "disabled-option",
          "selection",
          "modal",
          "theme",
          "retry",
        ],
      }),
    );
  } finally {
    await mini.disconnect();
    clearTimeout(watchdog);
  }
})().catch((error) => {
  console.error(error);
  clearTimeout(watchdog);
  process.exitCode = 1;
});
