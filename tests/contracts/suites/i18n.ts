// Built-in labels follow the locale set with the platform's config / locale
// provider, in every supported language (texts from @minerva/core's
// message bundles).
import { afterEach, describe, expect } from "vitest";
import { SUPPORTED_LANGUAGES, messages } from "../../../packages/core/src/i18n";
import { contractOf, initialProps } from "../harness/contracts";
import { contractTest } from "../harness/suite";
import { h, type Driver, type Handle } from "../harness/types";

type Tree = Record<string, Record<string, string>>;

export function i18nSuite(driver: Driver) {
  const SUITE = "i18n labels";
  let handle: Handle | undefined;
  afterEach(() => handle?.unmount());

  describe(SUITE, () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const texts = messages[language] as unknown as Tree;

      contractTest(
        driver,
        SUITE,
        `Modal close label (${language})`,
        async () => {
          handle = await driver.render(
            h(
              "Modal",
              initialProps(contractOf("Modal"), driver.platform, "open", true),
              "Body",
            ),
            { locale: language },
          );
          expect(
            driver.queryByRole("button", { name: texts.modal.close }),
          ).not.toBeNull();
        },
      );

      contractTest(
        driver,
        SUITE,
        `Pagination labels (${language})`,
        async () => {
          handle = await driver.render(
            h("Pagination", { total: 50, current: 2 }),
            { locale: language },
          );
          expect(
            driver.queryByRole("navigation", { name: texts.pagination.nav }),
          ).not.toBeNull();
          expect(
            driver.queryByRole("button", { name: texts.pagination.prev }),
          ).not.toBeNull();
          expect(
            driver.queryByRole("button", { name: texts.pagination.next }),
          ).not.toBeNull();
        },
      );
    }
  });
}
