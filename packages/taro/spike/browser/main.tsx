import { useState } from "react";
import { createRoot } from "react-dom/client";
import * as M from "../../src";
import { ProjectWorkflow } from "../../examples/ProjectWorkflow";
import "@tarojs/components-react/dist/index.css";
import "../../../minerva-design/dist/core/tokens.mini.css";
import "../../../../tools/styles/mini-controls.css";
import "../../../../tools/styles/taro-components.css";
import "./fixture.css";
function Fixture() {
  const [time, setTime] = useState<Date | undefined>(
      new Date(2025, 0, 1, 13, 15),
    ),
    [active, setActive] = useState("page-0"),
    [mounted, setMounted] = useState(true),
    [items, setItems] = useState(
      Array.from({ length: 30 }, (_, id) => ({ id })),
    ),
    [requests, setRequests] = useState(0),
    [edgePicker, setEdgePicker] = useState(""),
    [edgeMenu, setEdgeMenu] = useState(""),
    [menuSelection, setMenuSelection] = useState("");
  return (
    <M.ConfigProvider theme="light">
      <main>
        <section id="theme">
          <M.ThemeToggle />
          <M.Card id="theme-card" padding="large">
            <M.Avatar id="avatar" name="Ada Lovelace" size="large" />
            <M.Badge content={4} position="bottom-left" borderWidth="2px">
              <M.Button>Inbox</M.Button>
            </M.Badge>
          </M.Card>
        </section>
        <section id="audit">
          {["ltr-right", "rtl-center", "rtl-left"].map((mode) => (
            <M.Button key={mode} onClick={() => setEdgeMenu(mode)}>
              Show submenu {mode}
            </M.Button>
          ))}
          <output id="menu-selection">{menuSelection}</output>
          {edgeMenu && (
            <aside
              id="edge-menu"
              style={{
                position: "fixed",
                top: 320,
                width: 180,
                left:
                  edgeMenu === "rtl-center"
                    ? 500
                    : edgeMenu === "rtl-left"
                      ? 8
                      : undefined,
                right: edgeMenu === "ltr-right" ? 8 : undefined,
                zIndex: 45,
              }}
            >
              <M.Menu
                key={edgeMenu}
                defaultOpen
                size="small"
                dir={edgeMenu.startsWith("rtl") ? "rtl" : "ltr"}
                aria-label="Root actions"
                items={[
                  {
                    key: "more",
                    label: "More actions",
                    children: [
                      {
                        key: "advanced",
                        label: "Advanced",
                        children: [{ key: "deep", label: "Deep action" }],
                      },
                    ],
                  },
                ]}
                onSelect={(item) => setMenuSelection(item.key)}
              >
                <M.Button>Nested actions</M.Button>
              </M.Menu>
            </aside>
          )}

          <M.Input
            className="audit-small-input"
            prefix="@"
            size="small"
            variant="filled"
            aria-label="Small field"
          />
          {["Select", "AutoComplete", "Cascader"].map((kind) => (
            <M.Button key={kind} onClick={() => setEdgePicker(kind)}>
              Show {kind} edge
            </M.Button>
          ))}
          {edgePicker && (
            <aside
              id="edge-picker"
              style={{
                position: "fixed",
                bottom: 8,
                right: 8,
                width: 220,
                zIndex: 40,
              }}
            >
              {edgePicker === "Select" && (
                <M.Select
                  defaultOpen
                  options={[{ value: "one", label: "Edge option" }]}
                />
              )}
              {edgePicker === "AutoComplete" && (
                <M.AutoComplete
                  defaultOpen
                  options={[{ value: "one", label: "Edge option" }]}
                />
              )}
              {edgePicker === "Cascader" && (
                <M.Cascader
                  width="100%"
                  defaultOpen
                  expandTrigger="hover"
                  options={[
                    {
                      value: "one",
                      label: "Edge option",
                      children: [{ value: "child", label: "Hovered child" }],
                    },
                  ]}
                />
              )}
            </aside>
          )}
          <M.Table
            id="audit-loading-table"
            size="small"
            loading
            loadingRows={3}
            columns={[{ key: "id", header: "ID" }]}
            data={[]}
          />
          <M.MonthCalendar
            id="audit-calendar"
            size="small"
            defaultMonth={new Date(2026, 9, 1)}
          />
          <M.Menu
            size="small"
            side="top"
            align="end"
            items={[{ key: "one", label: "Audit item" }]}
          >
            <M.Button style={{ width: 200 }}>Audit actions</M.Button>
          </M.Menu>
          <M.Switch
            aria-label="Large square switch"
            size="large"
            shape="square"
            color="danger"
          />
          <M.Switch
            aria-label="Small segments"
            variant="segmented"
            size="small"
            color="success"
            offLabel="Off"
            onLabel="On"
          />
          <M.Modal
            trigger={<M.Button>Open wide modal</M.Button>}
            title={<span>Wide modal</span>}
            size="xlarge"
          >
            <M.ModalBody>
              <M.Box style={{ height: 1200 }}>Wide content</M.Box>
            </M.ModalBody>
            <M.ModalFooter>
              <M.ModalClose>Finish modal</M.ModalClose>
            </M.ModalFooter>
          </M.Modal>

          <M.Box
            id="audit-box"
            bg="bg.subtle"
            rounded="lg"
            boxShadow="md"
            w="200"
            h="40"
          >
            Tokens
          </M.Box>
          <M.Alert
            id="audit-alert"
            size="large"
            variant="outline"
            color="danger"
            animation={false}
          >
            Alert geometry
          </M.Alert>
          <M.Drawer
            trigger={<M.Button>Open audit drawer</M.Button>}
            title={<span>Audit drawer</span>}
            size="large"
            side="bottom"
          >
            <M.DrawerBody>Drawer contents</M.DrawerBody>
            <M.DrawerFooter>
              <M.DrawerClose>Finish drawer</M.DrawerClose>
            </M.DrawerFooter>
          </M.Drawer>
        </section>
        <section id="time">
          <h2>Time input</h2>
          <M.TimePicker
            value={time}
            onChange={setTime}
            use12Hours
            format="hh:mm:ss a"
            showSecond={false}
            minuteStep={15}
          />
          <output>
            {time?.getHours()}:{time?.getMinutes()}
          </output>
        </section>
        <section id="pages">
          <h2>Page navigation</h2>
          <M.Button onClick={() => setActive("page-11")}>Go last page</M.Button>
          <M.PageTabs
            activeValue={active}
            onChange={setActive}
            aria-label="Open pages"
            style={{ width: 360 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <M.PageTab key={i} value={`page-${i}`} label={`Page ${i + 1}`} />
            ))}
          </M.PageTabs>
        </section>
        <section id="virtual">
          <h2>Native virtual list</h2>
          <output>Requests: {requests}</output>
          <M.VirtualList
            aria-label="Records"
            items={items}
            itemHeight={28}
            itemPadding={4}
            maxHeight={140}
            loadMoreThreshold={50}
            renderItem={(item) => `Record ${item.id}`}
            onLoadMore={async () => {
              setRequests((n) => n + 1);
              await new Promise((resolve) => setTimeout(resolve, 350));
              setItems((rows) => [
                ...rows,
                ...Array.from({ length: 5 }, (_, i) => ({
                  id: rows.length + i,
                })),
              ]);
            }}
          />
        </section>
        <section id="workflow">
          <ProjectWorkflow />
        </section>
      </main>
      {mounted && (
        <div className="edge">
          <M.Popover>
            <M.PopoverTrigger>
              <M.Button>Edge details</M.Button>
            </M.PopoverTrigger>
            <M.PopoverContent
              side="bottom"
              align="end"
              arrow
              aria-label="Edge details panel"
              style={{ width: 240 }}
            >
              <M.Box style={{ height: 90 }}>Measured native edge content</M.Box>
              <M.PopoverClose>
                <M.Button>Close panel</M.Button>
              </M.PopoverClose>
              <M.Button onClick={() => setMounted(false)}>
                Unmount panel
              </M.Button>
            </M.PopoverContent>
          </M.Popover>
        </div>
      )}
    </M.ConfigProvider>
  );
}
createRoot(document.getElementById("app")!).render(<Fixture />);
