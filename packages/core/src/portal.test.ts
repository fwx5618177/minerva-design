import { afterEach, describe, expect, it } from "vitest";
import {
  createPortalHost,
  getPortalContainer,
  PORTAL_HOST_ATTRIBUTE,
} from "./portal";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("portal", () => {
  it("getPortalContainer prefers the explicit container", () => {
    const explicit = document.createElement("div");
    expect(getPortalContainer(explicit)).toBe(explicit);
    expect(getPortalContainer(null)).toBe(document.body);
    expect(getPortalContainer()).toBe(document.body);
  });

  it("createPortalHost appends a host with id and attributes", () => {
    const host = createPortalHost({
      id: "overlays",
      attributes: { "data-theme": "dark", class: "minerva" },
    });
    expect(host.parentElement).toBe(document.body);
    expect(host.id).toBe("overlays");
    expect(host.tagName).toBe("DIV");
    expect(host.hasAttribute(PORTAL_HOST_ATTRIBUTE)).toBe(true);
    expect(host.getAttribute("data-theme")).toBe("dark");
    expect(host.className).toBe("minerva");
    host.remove();
    expect(document.getElementById("overlays")).toBeNull();
  });

  it("createPortalHost supports a parent and tag name", () => {
    const parent = document.createElement("section");
    document.body.appendChild(parent);
    const host = createPortalHost({ parent, tagName: "aside" });
    expect(host.parentElement).toBe(parent);
    expect(host.tagName).toBe("ASIDE");
    expect(host.id).toBe("");
  });
});
