import type { WcHookScenario } from "../types";

const colors = ["primary", "success", "warning", "danger", "info", "neutral"];

export default [
  {
    name: "header, description, cards and footer",
    html: `<minerva-kanban-column heading="Doing" count="2" color="primary" description="In progress"><button type="button" slot="actions">Add</button><div>A</div><div>B</div><button type="button" slot="footer">Add card</button></minerva-kanban-column>`,
  },
  {
    name: "empty",
    html: `<minerva-kanban-column heading="Done" count="0"></minerva-kanban-column>`,
  },
  {
    name: "colors",
    html: colors
      .map(
        (color) =>
          `<minerva-kanban-column heading="${color}" color="${color}"><div>Card</div></minerva-kanban-column>`,
      )
      .join(""),
  },
] satisfies WcHookScenario[];
