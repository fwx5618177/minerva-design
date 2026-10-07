/**
 * @vitest-environment node
 *
 * Ported from novel-isr-ui Confirm/__test__/Confirm.server.test.ts.
 * On the server (RSC / SSR render) there is no document: confirm() must
 * resolve false deterministically, without throwing or hanging.
 */
import { expect, it } from "vitest";
import { confirm } from "./Confirm";

it("resolves false on the server where no user can answer", async () => {
  expect(typeof document).toBe("undefined");
  await expect(confirm({ title: "Delete?" })).resolves.toBe(false);
});
