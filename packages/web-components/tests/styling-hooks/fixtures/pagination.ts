import type { WcHookScenario } from "../types";

export default [
  {
    name: "total, jumper, size changer",
    html: `<minerva-pagination total="100" show-total show-quick-jumper show-size-changer
      size="small" shape="circle" variant="outline"></minerva-pagination>`,
  },
  {
    name: "simple, disabled",
    html: `<minerva-pagination total="50" simple disabled></minerva-pagination>`,
  },
] satisfies WcHookScenario[];
