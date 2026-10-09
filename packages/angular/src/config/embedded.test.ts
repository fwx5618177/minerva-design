import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { expect, it } from "vitest";
import * as config from "./index";
import { MnConfig } from "./config";
import { render } from "../testing";
@Component({
  imports: [MnConfig],
  template: `<mn-config theme="dark">Embedded content</mn-config>`,
})
class EmbeddedHost {}
it("exports an embedded provider that keeps document configuration owned by the host", async () => {
  const provide = (config as unknown as Record<string, unknown>)[
    "provideEmbeddedMinerva"
  ];
  expect(provide).toBeTypeOf("function");
  document.documentElement.setAttribute("data-theme", "light");
  TestBed.configureTestingModule({
    providers: [(provide as () => ReturnType<typeof config.provideMinerva>)()],
  });
  const f = await render(EmbeddedHost);
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  expect(f.nativeElement.querySelector("mn-config")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  f.destroy();
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
});
