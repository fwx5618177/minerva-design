import { Component } from "@angular/core";
import {
  MnDrawer,
  MnDrawerBody,
  MnDrawerFooter,
  MnDrawerHeader,
} from "../../components/drawer";
import type { HookScenario } from "../types";

@Component({
  imports: [MnDrawer],
  template: `<mn-drawer
    [open]="true"
    title="Title"
    description="Description"
    side="left"
    size="large"
    >Body</mn-drawer
  >`,
})
class Open {}

@Component({
  imports: [MnDrawer, MnDrawerHeader, MnDrawerBody, MnDrawerFooter],
  template: `<mn-drawer [open]="false" forceMount side="top" size="small">
    <mn-drawer-header>Title</mn-drawer-header>
    <mn-drawer-body>Body</mn-drawer-body>
    <mn-drawer-footer>Footer</mn-drawer-footer>
  </mn-drawer>`,
})
class Closing {}

@Component({
  imports: [MnDrawer],
  template: `<mn-drawer [open]="true" title="Title" size="full"
    >Body</mn-drawer
  >`,
})
class Full {}

@Component({
  imports: [MnDrawer],
  template: `<mn-drawer [open]="true" title="Title" side="bottom"
    >Body</mn-drawer
  >`,
})
class Bottom {}

export default [
  { name: "open", component: Open },
  { name: "compound, closing (kept mounted)", component: Closing },
  { name: "default side, full size", component: Full },
  { name: "medium, bottom", component: Bottom },
] satisfies HookScenario[];
