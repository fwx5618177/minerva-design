import { Component } from "@angular/core";
import { MnModal, MnModalBody, MnModalFooter } from "../../components/modal";
import type { HookScenario } from "../types";
@Component({
  imports: [MnModal, MnModalBody, MnModalFooter],
  template: `<mn-modal [open]="true" title="Dialog" description="Details"
    ><mn-modal-body>Body</mn-modal-body
    ><mn-modal-footer>Footer</mn-modal-footer></mn-modal
  >`,
})
class Open {}
@Component({
  imports: [MnModal],
  template: `<mn-modal forceMount title="Dialog" />`,
})
class Closed {}
export default [
  { name: "open", component: Open },
  { name: "closed", component: Closed },
] satisfies HookScenario[];
