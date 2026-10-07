import { useState } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useHideOthers } from "./useHideOthers";

function Hide({ enabled }: { enabled: boolean }) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useHideOthers(node, enabled);
  return <div ref={setNode}>modal</div>;
}

describe("useHideOthers", () => {
  it("marks siblings aria-hidden while enabled and restores them", () => {
    const sibling = document.createElement("main");
    const preHidden = document.createElement("aside");
    preHidden.setAttribute("aria-hidden", "true");
    document.body.append(sibling, preHidden);
    const { rerender, unmount } = render(<Hide enabled />);
    const modal = screen.getByText("modal");
    expect(sibling).toHaveAttribute("aria-hidden", "true");
    expect(modal.closest("[aria-hidden]")).toBeNull();
    rerender(<Hide enabled={false} />);
    expect(sibling).not.toHaveAttribute("aria-hidden");
    expect(preHidden).toHaveAttribute("aria-hidden", "true");
    rerender(<Hide enabled />);
    unmount();
    expect(sibling).not.toHaveAttribute("aria-hidden");
    sibling.remove();
    preHidden.remove();
  });
});
