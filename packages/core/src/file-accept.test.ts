import { describe, expect, it } from "vitest";
import { matchesAccept } from "./file-accept";

const png = { name: "Photo.PNG", type: "image/png" };
const pdf = { name: "doc.pdf", type: "application/pdf" };

describe("matchesAccept", () => {
  it("accepts everything for empty lists and wildcards", () => {
    expect(matchesAccept(pdf, "")).toBe(true);
    expect(matchesAccept(pdf, "*")).toBe(true);
    expect(matchesAccept(pdf, "*/*")).toBe(true);
  });

  it("matches extensions case-insensitively", () => {
    expect(matchesAccept(png, ".png")).toBe(true);
    expect(matchesAccept(png, ".jpg, .PNG")).toBe(true);
    expect(matchesAccept(pdf, ".png")).toBe(false);
  });

  it("matches MIME types and type wildcards", () => {
    expect(matchesAccept(png, "image/*")).toBe(true);
    expect(matchesAccept(png, "IMAGE/PNG")).toBe(true);
    expect(matchesAccept(pdf, "image/*,text/plain")).toBe(false);
    expect(matchesAccept(pdf, "image/*, application/pdf")).toBe(true);
  });
});
