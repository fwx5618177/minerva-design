import { test as base, expect } from "@playwright/test";
export { expect };
export const test = base.extend<{ browserErrors: void }>({
  browserErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await use();
      expect(errors, "Browser console.error and uncaught errors").toEqual([]);
    },
    { auto: true },
  ],
});
