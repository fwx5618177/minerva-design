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
    element: (
      <Modal open title="Title" description="Description" size="large">
        Body
      </Modal>
    ),
  },
  {
    name: "compound, closing (kept mounted)",
    element: (
      <ModalRoot open={false}>
        <ModalContent forceMount hideCloseButton>
          <ModalHeader>Title</ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </ModalRoot>
    ),
  },
] satisfies HookScenario[];
