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
    element: (
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <input />
        <FormHelperText>We never share it</FormHelperText>
      </FormControl>
    ),
  },
  {
    name: "invalid: error message",
    element: (
      <FormField label="Email" errorMessage="Invalid email">
        <input />
      </FormField>
    ),
  },
  {
    name: "disabled, read-only",
    element: (
      <FormControl disabled readOnly>
        <FormLabel>Email</FormLabel>
        <input />
        <FormErrorMessage>Not shown</FormErrorMessage>
      </FormControl>
    ),
  },
] satisfies HookScenario[];
