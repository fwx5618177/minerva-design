import simulate from "miniprogram-simulate";
import { expect, it } from "vitest";
import { card } from "./index";
it("renders authored card header without title or description props", () => {
  const cardId = simulate.load({
    tagName: "mn-card",
    template: card.template,
    ...card.definition,
  });
  const hostId = simulate.load({
    tagName: "card-host",
    usingComponents: { "mn-card": cardId },
    template:
      '<mn-card><view slot="header">Custom heading</view><view>Body</view><view slot="footer">Actions</view></mn-card>',
  });
  const wrapper = simulate.render(hostId);
  wrapper.attach(document.createElement("div"));
  expect(wrapper.dom!.textContent).toContain("Custom heading");
  expect(wrapper.dom!.textContent).toContain("Body");
  expect(wrapper.dom!.textContent).toContain("Actions");
  wrapper.detach();
});
