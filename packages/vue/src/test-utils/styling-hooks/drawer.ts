import { h } from "vue";
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
    render: () =>
      h(
        Drawer,
        {
          open: true,
          title: "Title",
          description: "Description",
          side: "left",
          size: "large",
        },
        () => "Body",
      ),
  },
  {
    name: "compound, closing (kept mounted)",
    render: () =>
      h(DrawerRoot, { open: false }, () =>
        h(
          DrawerContent,
          { forceMount: true, side: "top", size: "small" },
          () => [
            h(DrawerHeader, null, () => "Title"),
            h(DrawerBody, null, () => "Body"),
            h(DrawerFooter, null, () => "Footer"),
          ],
        ),
      ),
  },
  {
    name: "default side, full size",
    render: () =>
      h(Drawer, { open: true, title: "Title", size: "full" }, () => "Body"),
  },
  {
    name: "medium, bottom",
    render: () =>
      h(Drawer, { open: true, title: "Title", side: "bottom" }, () => "Body"),
  },
] satisfies HookScenario[];
