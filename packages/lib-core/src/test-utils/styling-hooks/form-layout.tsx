import { FormLayout } from "../../components/FormLayout";
import type { HookScenario } from "./types";

export default [
  {
    name: "default",
    element: (
      <FormLayout columns={{ base: 1, md: 2 }}>
        <input aria-label="Name" />
      </FormLayout>
    ),
  },
] satisfies HookScenario[];
