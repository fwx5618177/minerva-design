import { test } from "node:test";
import assert from "node:assert/strict";
import { launchChrome } from "./chrome-cdp.mjs";

test("real Chrome CDP evaluates, reports exceptions, times out and closes its profile", async () => {
  const page = await launchChrome({
    width: 390,
    height: 844,
    mobile: true,
    hasTouch: true,
  });
  try {
    await page.navigate(
      'data:text/html,<meta name="viewport" content="width=device-width"><button onclick="window.trustedClick=event.isTrusted;window.activeClick=navigator.userActivation.isActive">Ready</button>',
    );
    await page.wait(
      'document.querySelector("button")?.textContent === "Ready"',
    );
    await page.click('document.querySelector("button")');
    assert.equal(await page.evaluate("window.trustedClick"), true);
    assert.equal(await page.evaluate("window.activeClick"), true);
    assert.equal(await page.evaluate("innerWidth"), 390);
    assert.equal(await page.evaluate("navigator.maxTouchPoints > 0"), true);
    await assert.rejects(
      page.evaluate('throw Error("probe exception")'),
      /probe exception/,
    );
    await assert.rejects(
      page.wait("false", { timeout: 10 }),
      /condition timed out/,
    );
    await page.call("Page.navigate", {
      url: 'data:text/html,<script>setTimeout(()=>{throw Error("event probe")},100)</script>',
    });
    await page.wait('document.readyState === "complete"');
    for (let i = 0; i < 20 && !page.errors.length; i++)
      await new Promise((resolve) => setTimeout(resolve, 25));
    assert.match(page.errors.join("\n"), /event probe/);
  } finally {
    await page.close();
  }
});
