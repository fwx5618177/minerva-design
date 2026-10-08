import { h } from "vue";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalRoot,
} from "../../components/Modal";
import type { HookScenario } from "./types";

export default [
  {
    name: "open",
    render: () =>
      h(
        Modal,
        {
          open: true,
          title: "Title",
          description: "Description",
          size: "large",
        },
        () => "Body",
      ),
  },
  {
    name: "compound, closing (kept mounted)",
    render: () =>
      h(ModalRoot, { open: false }, () =>
        h(ModalContent, { forceMount: true, hideCloseButton: true }, () => [
          h(ModalHeader, null, () => "Title"),
          h(ModalBody, null, () => "Body"),
          h(ModalFooter, null, () => "Footer"),
        ]),
      ),
  },
] satisfies HookScenario[];
