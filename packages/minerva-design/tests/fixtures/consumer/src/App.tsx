// A React app of a consumer of the packed minerva-design tarball.
import { Button, ConfigProvider, Tooltip } from "minerva-design";

export function App() {
  return (
    <ConfigProvider theme="light">
      <Tooltip content="Saves the draft">
        <Button>Save the draft</Button>
      </Tooltip>
      {/* typed by minerva-design/web-components/react (tsconfig "types") */}
      <minerva-button variant="outline">Web component</minerva-button>
    </ConfigProvider>
  );
}
