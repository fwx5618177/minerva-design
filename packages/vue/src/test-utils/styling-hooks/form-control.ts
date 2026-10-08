import { h } from "vue";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormHelperText,
  FormLabel,
} from "../../components/FormControl";
import type { HookScenario } from "./types";

export default [
  {
    name: "label, required indicator, helper text",
    render: () =>
      h(FormControl, { required: true }, () => [
        h(FormLabel, null, () => "Email"),
        h("input"),
        h(FormHelperText, null, () => "We never share it"),
      ]),
  },
  {
    name: "invalid: error message",
    render: () =>
      h(FormField, { label: "Email", errorMessage: "Invalid email" }, () =>
        h("input"),
      ),
  },
  {
    name: "disabled, read-only",
    render: () =>
      h(FormControl, { disabled: true, readOnly: true }, () => [
        h(FormLabel, null, () => "Email"),
        h("input"),
        h(FormErrorMessage, null, () => "Not shown"),
      ]),
  },
] satisfies HookScenario[];
