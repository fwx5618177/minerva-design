// Vitest setup of the Angular renderer: the JIT compiler (the test hosts and
// the contract driver compile templates at runtime; the library itself is
// compiled AOT by Analog's plugin), a zoneless TestBed and the DOM matchers.
import "@angular/compiler";
import "@testing-library/jest-dom/vitest";
import { setupTestBed } from "@analogjs/vitest-angular/setup-testbed";
import { afterEach } from "vitest";

setupTestBed({ zoneless: true });

afterEach(() => {
  document.body.innerHTML = "";
  for (const name of Array.from(document.documentElement.attributes))
    if (name.name !== "lang")
      document.documentElement.removeAttribute(name.name);
});
