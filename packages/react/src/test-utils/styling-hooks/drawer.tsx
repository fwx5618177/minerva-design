import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
} from "../../components/Drawer";
import type { HookScenario } from "./types";

export default [
  {
    name: "open",
    element: (
      <Drawer
        open
        title="Title"
        description="Description"
        side="left"
        size="large"
      >
        Body
      </Drawer>
    ),
  },
  {
    name: "compound, closing (kept mounted)",
    element: (
      <DrawerRoot open={false}>
        <DrawerContent forceMount side="top" size="small">
          <DrawerHeader>Title</DrawerHeader>
          <DrawerBody>Body</DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    ),
  },
  {
    name: "default side, full size",
    element: (
      <Drawer open title="Title" size="full">
        Body
      </Drawer>
    ),
  },
  {
    name: "medium, bottom",
    element: (
      <Drawer open title="Title" side="bottom">
        Body
      </Drawer>
    ),
  },
] satisfies HookScenario[];
