import { DashboardColumn } from "../../components/DashboardColumns";
import type { HookScenario } from "./types";

const colors = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
] as const;

export default [
  {
    name: "header, description, cards and footer",
    element: (
      <DashboardColumn
        title="Doing"
        count={2}
        color="primary"
        description="In progress"
        actions={<button type="button">Add</button>}
        footer={<button type="button">Add card</button>}
      >
        <div>A</div>
        <div>B</div>
      </DashboardColumn>
    ),
  },
  {
    name: "empty",
    element: <DashboardColumn title="Done" count={0} />,
  },
  {
    name: "colors",
    element: (
      <>
        {colors.map((color) => (
          <DashboardColumn key={color} title={color} color={color}>
            <div>Card</div>
          </DashboardColumn>
        ))}
      </>
    ),
  },
] satisfies HookScenario[];
