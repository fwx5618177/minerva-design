// @vitest-environment node
// On the server (SSR / static rendering) there is no document: confirm()
// must resolve false deterministically, without throwing or hanging.
import { expect, it } from "vitest";
import { confirm } from "../../elements/confirm";

it("resolves false on the server where no user can answer", async () => {
  expect(typeof document).toBe("undefined");
  await expect(confirm({ title: "Delete?" })).resolves.toBe(false);
});
