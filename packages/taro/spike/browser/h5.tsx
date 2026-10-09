import { useState } from "react";
import { createRoot } from "react-dom/client";
import * as M from "../../src";
import { MonacoCodeEditor } from "../../src/monaco";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import "@tarojs/components-react/dist/index.css";
import "../../../minerva-design/dist/core/tokens.mini.css";
import "../../../../tools/styles/mini-controls.css";
import "../../../../tools/styles/taro-components.css";
(globalThis as any).MonacoEnvironment = { getWorker: () => new EditorWorker() };
function PopoverLifecycle({
  mode,
}: {
  mode: "default" | "modal" | "nonmodal";
}) {
  const [callbacks, setCallbacks] = useState(0);
  return (
    <section>
      <button id={`outside-${mode}`}>Outside {mode}</button>
      <M.Popover
        modal={mode === "default" ? undefined : mode === "modal"}
        label={`Popover ${mode}`}
      >
        <M.PopoverTrigger>Open {mode} popover</M.PopoverTrigger>
        <M.PopoverContent>
          <M.PopoverClose asChild onClick={() => setCallbacks((v) => v + 1)}>
            <M.Button onClick={(event) => event.preventDefault()}>
              Canceled {mode} close
            </M.Button>
          </M.PopoverClose>
          <M.PopoverClose onClick={(event) => event.preventDefault()}>
            Owner canceled {mode}
          </M.PopoverClose>
          <M.PopoverClose>Close {mode}</M.PopoverClose>
          <output id={`callbacks-${mode}`}>{callbacks}</output>
        </M.PopoverContent>
      </M.Popover>
    </section>
  );
}
function Fixture() {
  const [code, setCode] = useState("hello"),
    [files, setFiles] = useState(""),
    [command, setCommand] = useState("");
  return (
    <M.ConfigProvider>
      <M.Tabs defaultValue="a" activationMode="manual">
        <M.TabList loop={false}>
          <M.Tab value="a">Alpha</M.Tab>
          <M.Tab value="b" disabled>
            Blocked
          </M.Tab>
          <M.Tab value="c">Charlie</M.Tab>
        </M.TabList>
        <M.TabPanel value="a">Alpha panel</M.TabPanel>
        <M.TabPanel value="c">Charlie panel</M.TabPanel>
      </M.Tabs>
      <M.Select
        aria-label="Choice"
        options={[
          { value: "a", label: "Apple" },
          { value: "b", label: "Banana" },
        ]}
      />
      <M.CommandDialog
        trigger={<M.Button>Commands</M.Button>}
        items={[
          { id: "a", title: "First" },
          { id: "b", title: "Second" },
        ]}
        onSelect={(item) => setCommand(item.id)}
      />
      <output id="command-result">{command}</output>
      <M.Upload
        accept=".txt"
        onFilesSelected={(value) => setFiles(value[0]?.name ?? "")}
      />
      <output id="files">{files}</output>
      <M.HtmlPreview
        title="Sandbox"
        html={
          '<p>Safe preview</p><script>parent.window.compromised=true</script><img src="https://untrusted.invalid/x">'
        }
      />
      <M.Drawer
        title="Locked drawer"
        trigger={<M.Button>Open drawer</M.Button>}
      >
        <M.Button>Inside drawer</M.Button>
      </M.Drawer>
      <MonacoCodeEditor
        monaco={monaco}
        value={code}
        onChange={setCode}
        label="Source"
        height={200}
      />
      <output id="code">{code}</output>
      <PopoverLifecycle mode="default" />
      <PopoverLifecycle mode="nonmodal" />
      <PopoverLifecycle mode="modal" />
    </M.ConfigProvider>
  );
}
createRoot(document.getElementById("app")!).render(<Fixture />);
