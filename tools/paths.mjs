// Output folders of the published `minerva-design` package, shared by the
// builds of the private workspace packages that assemble it:
//   @minerva/core           -> packages/minerva-design/dist/core
//   @minerva/react          -> packages/minerva-design/dist/react
//   @minerva/web-components -> packages/minerva-design/dist/web-components
import { fileURLToPath } from "node:url";

/** packages/minerva-design (the published package) */
export const PACKAGE_DIR = fileURLToPath(
  new URL("../packages/minerva-design/", import.meta.url),
);
/** packages/minerva-design/dist */
export const DIST_DIR = fileURLToPath(
  new URL("../packages/minerva-design/dist/", import.meta.url),
);
export const CORE_DIST = `${DIST_DIR}core`;
export const REACT_DIST = `${DIST_DIR}react`;
export const WEB_COMPONENTS_DIST = `${DIST_DIR}web-components`;
