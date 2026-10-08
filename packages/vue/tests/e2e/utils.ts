import { flushPromises, mount } from "@vue/test-utils";
import userEvent from "@testing-library/user-event";
import { defineComponent, nextTick, type VNode } from "vue";
import { screen } from "@testing-library/dom";

/** Waits for renders, post-flush watchers and deferred focus restores */
export async function settle(ms = 0) {
  await flushPromises();
  await new Promise((resolve) => setTimeout(resolve, ms));
  await nextTick();
  await flushPromises();
}

/** Mounts a render function into the document (overlays teleport to body) */
export function renderApp(render: () => VNode | VNode[]) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const wrapper = mount(defineComponent({ setup: () => render }), {
    attachTo: document.body,
  });
  return { user, wrapper, screen };
}

export const dialogs = () =>
  Array.from(document.querySelectorAll('[role="dialog"]'));
