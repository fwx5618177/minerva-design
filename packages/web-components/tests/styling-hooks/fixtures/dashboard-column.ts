import type { WcHookScenario } from "../types";

const colors = ["primary", "success", "warning", "danger", "info", "neutral"];

export default [
  {
    name: "header, description, cards and footer",
    html: `<minerva-dashboard-column heading="Doing" count="2" color="primary" description="In progress"><button type="button" slot="actions">Add</button><div>A</div><div>B</div><button type="button" slot="footer">Add card</button></minerva-dashboard-column>`,
  },
  {
    name: "empty",
    html: `<minerva-dashboard-column heading="Done" count="0"></minerva-dashboard-column>`,
  },
  {
    name: "colors",
    html: colors
      .map(
        (color) =>
          `<minerva-dashboard-column heading="${color}" color="${color}"><div>Card</div></minerva-dashboard-column>`,
      )
      .join(""),
  },
] satisfies WcHookScenario[];
