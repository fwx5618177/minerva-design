import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { Text, Linking } from "react-native";
import { describe, it, expect, vi } from "vitest";
import * as N from "./index";
import { hostElements } from "../test/queries";
describe("native expanded surface", () => {
  it("exports implemented layout, display, navigation and editor controls", () => {
    for (const key of [
      "Box",
      "Stack",
      "HStack",
      "VStack",
      "ResponsiveGrid",
      "SplitLayout",
      "Page",
      "PageHeader",
      "PageSection",
      "StatCard",
      "Toolbar",
      "AppShell",
      "PageTabs",
      "PageTab",
      "FormControl",
      "FormLabel",
      "FormHelperText",
      "FormErrorMessage",
      "FormLayout",
      "LoadingState",
      "DescriptionList",
      "List",
      "ListItem",
      "Prose",
      "TextLink",
      "CodeBlock",
      "CodeEditor",
      "JsonField",
      "KeyValueEditor",
      "TagInput",
      "TimePicker",
      "NavTree",
      "ConfirmDialog",
      "ConfirmProvider",
      "useConfirm",
    ])
      expect(N).toHaveProperty(key);
  });
  it("resolves layout tokens and responds to container width", async () => {
    await render(
      <N.ResponsiveGrid testID="grid" columns={{ base: 1, md: 2 }} gap={4}>
        <Text>A</Text>
        <Text>B</Text>
      </N.ResponsiveGrid>,
    );
    await fireEvent(screen.getByTestId("grid"), "layout", {
      nativeEvent: { layout: { width: 800, height: 100, x: 0, y: 0 } },
    });
    expect(screen.getAllByTestId("grid-cell")[0]).toHaveStyle({ width: 392 });
  });
  it("opens AppShell navigation and chooses a tree leaf", async () => {
    const select = vi.fn();
    await render(
      <N.AppShell
        brand="Demo"
        navigation={() => (
          <N.NavTree
            sections={[
              {
                id: "main",
                items: [
                  {
                    id: "branch",
                    label: "Settings",
                    children: [{ id: "profile", label: "Profile" }],
                  },
                ],
              },
            ]}
            onItemSelect={select}
          />
        )}
      >
        <Text>Page body</Text>
      </N.AppShell>,
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Open navigation" }),
    );
    await fireEvent.press(screen.getByRole("button", { name: "Settings" }));
    await fireEvent.press(screen.getByRole("button", { name: "Profile" }));
    expect(select).toHaveBeenLastCalledWith({
      id: "profile",
      label: "Profile",
    });
  });
  it("commits distinct tags from separators, removes and clears them", async () => {
    const change = vi.fn();
    await render(<N.TagInput accessibilityLabel="Tags" onChange={change} />);
    await fireEvent.changeText(
      screen.getByLabelText("Tags"),
      "alpha,beta,alpha,",
    );
    expect(change).toHaveBeenLastCalledWith(["alpha", "beta"]);
    await fireEvent.press(screen.getByRole("button", { name: "Remove alpha" }));
    expect(change).toHaveBeenLastCalledWith(["beta"]);
    await fireEvent.press(screen.getByRole("button", { name: "Clear tags" }));
    expect(change).toHaveBeenLastCalledWith([]);
  });
  it("edits key-value rows using stable ids", async () => {
    const change = vi.fn();
    await render(
      <N.KeyValueEditor
        defaultEntries={[{ id: "a", key: "a", value: "1" }]}
        onChange={change}
      />,
    );
    await fireEvent.changeText(screen.getByLabelText("Value 1"), "2");
    expect(change).toHaveBeenLastCalledWith([
      { id: "a", key: "a", value: "2" },
    ]);
    await fireEvent.press(screen.getByRole("button", { name: "Add entry" }));
    expect(change.mock.lastCall?.[0]).toHaveLength(2);
    await fireEvent.press(
      screen.getByRole("button", { name: "Remove entry 1" }),
    );
    expect(change.mock.lastCall?.[0]).toHaveLength(1);
  });
  it("formats JSON and exposes invalid syntax accessibly", async () => {
    await render(
      <N.JsonField accessibilityLabel="JSON" defaultValue={'{"a":1}'} />,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Format JSON" }));
    expect(screen.getByLabelText("JSON").props.value).toBe('{\n  "a": 1\n}');
    await fireEvent.changeText(screen.getByLabelText("JSON"), "{bad");
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Format JSON" })).toBeDisabled();
  });
  it("formats source using the caller formatter and copies exact code", async () => {
    const copy = vi.fn().mockResolvedValue(undefined);
    const change = vi.fn();
    await render(
      <>
        <N.CodeEditor
          label="Source"
          defaultValue="x"
          onChange={change}
          format={(source) => source + ";"}
        />
        <N.CodeBlock copyable copyText={copy}>
          {"a < b"}
        </N.CodeBlock>
      </>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Format code" }));
    expect(change).toHaveBeenLastCalledWith("x;");
    await act(async () => {
      await fireEvent.press(screen.getByRole("button", { name: "Copy code" }));
    });
    expect(copy).toHaveBeenCalledWith("a < b");
    expect(screen.getByText("Copied")).toBeTruthy();
  });
  it("wires composed form labels, disabled and error state", async () => {
    await render(
      <N.FormControl disabled invalid>
        <N.FormLabel>Email</N.FormLabel>
        <N.Input />
        <N.FormErrorMessage>Required</N.FormErrorMessage>
      </N.FormControl>,
    );
    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
  it("confirms through a provider and resolves queued promises", async () => {
    const result = vi.fn();
    function Content() {
      const confirm = N.useConfirm();
      return (
        <N.Button
          onPress={() => void confirm({ title: "Delete record?" }).then(result)}
        >
          Delete
        </N.Button>
      );
    }
    await render(
      <N.ConfirmProvider>
        <Content />
      </N.ConfirmProvider>,
    );
    await fireEvent.press(screen.getByRole("button", { name: "Delete" }));
    await act(async () => {
      await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    });
    expect(result).toHaveBeenCalledWith(true);
  });
  it("opens a time selector with selected time and confirms changes", async () => {
    const change = vi.fn();
    await render(
      <N.TimePicker
        label="Time"
        defaultValue={new Date(2026, 0, 1, 9, 30)}
        onChange={change}
        showSecond={false}
      />,
    );
    await fireEvent.press(screen.getByRole("combobox", { name: "Time" }));
    await fireEvent.press(screen.getByRole("button", { name: "Confirm" }));
    expect(change.mock.calls[0]?.[0].getHours()).toBe(9);
  });
  it("renders zero-valued statistics, descriptions and list secondary content", async () => {
    await render(
      <>
        <N.StatCard label="Revenue" value={0} />
        <N.DescriptionList
          items={[{ key: "count", label: "Count", value: 0 }]}
        />
        <N.List>
          <N.ListItem primary="Inbox" secondary={0} />
        </N.List>
      </>,
    );
    expect(screen.getAllByText("0")).toHaveLength(3);
  });
  it("opens safe external links and blocks script URLs", async () => {
    const open = vi.spyOn(Linking, "openURL").mockResolvedValue(undefined);
    const view = await render(
      <N.TextLink href="https://example.com">Docs</N.TextLink>,
    );
    await fireEvent.press(screen.getByRole("link", { name: "Docs" }));
    expect(open).toHaveBeenCalledWith("https://example.com");
    await view.rerender(
      <N.TextLink href="javascript:alert(1)">Unsafe</N.TextLink>,
    );
    await fireEvent.press(screen.getByRole("link", { name: "Unsafe" }));
    expect(open).toHaveBeenCalledTimes(1);
  });
});
it("formats JSON without changing numeric lexemes, duplicate keys or escape sequences", async () => {
  const source = '{"n":9007199254740993,"n":1e+30,"s":"\\u0061"}';
  await render(
    <N.JsonField accessibilityLabel="Lossless JSON" defaultValue={source} />,
  );
  await fireEvent.press(screen.getByRole("button", { name: "Format JSON" }));
  const text = screen.getByLabelText("Lossless JSON").props.value;
  expect(text).toContain("9007199254740993");
  expect(text).toContain("1e+30");
  expect(text).toContain("\\u0061");
  expect(text.match(/"n"/g)).toHaveLength(2);
});
it("keeps an active descendant branch collapsible", async () => {
  await render(
    <N.NavTree
      activeId="leaf"
      sections={[
        {
          id: "main",
          items: [
            {
              id: "parent",
              label: "Parent",
              children: [{ id: "leaf", label: "Leaf" }],
            },
          ],
        },
      ]}
    />,
  );
  await fireEvent.press(screen.getByRole("button", { name: "Parent" }));
  expect(screen.queryByText("Leaf")).toBeNull();
});
it("uses provider locale for new editing and upload controls", async () => {
  await render(
    <N.MinervaProvider locale={{ language: "zh" }}>
      <N.JsonField accessibilityLabel="JSON" />
      <N.TagInput accessibilityLabel="Tags" />
      <N.KeyValueEditor />
      <N.Upload
        label="附件"
        value={[]}
        pickFiles={async () => []}
        onFilesSelected={() => {}}
      />
    </N.MinervaProvider>,
  );
  expect(screen.getByRole("button", { name: "格式化 JSON" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "添加标签" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "添加条目" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "选择文件" })).toBeTruthy();
});
it("inherits disabled form state in compound pickers and editor actions", async () => {
  await render(
    <N.FormControl disabled>
      <N.FormLabel>Fields</N.FormLabel>
      <N.JsonField defaultValue={'{"a":1}'} />
      <N.TagInput defaultValue={["alpha"]} />
      <N.Select options={[{ value: "a", label: "A" }]} />
      <N.Cascader options={[{ value: "a", label: "A" }]} />
    </N.FormControl>,
  );
  expect(screen.getByRole("button", { name: "Format JSON" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Remove alpha" })).toBeDisabled();
  for (const combo of screen.getAllByRole("combobox"))
    expect(combo).toBeDisabled();
});
it("fills responsive cells and supports full-width GridItem rows", async () => {
  await render(
    <N.ResponsiveGrid testID="responsive" columns={2} gap={0}>
      <N.GridItem text="Normal" />
      <N.GridItem fullWidth text="Wide" />
    </N.ResponsiveGrid>,
  );
  await fireEvent(screen.getByTestId("responsive"), "layout", {
    nativeEvent: { layout: { width: 600, height: 100, x: 0, y: 0 } },
  });
  expect(screen.getAllByTestId("grid-cell")[0]).toHaveStyle({ width: 300 });
  expect(screen.getAllByTestId("grid-cell")[1]).toHaveStyle({ width: 600 });
  for (const item of hostElements().filter(
    (el) => el.props.dataSet?.part === "item",
  ))
    expect(item).toHaveStyle({ width: "100%" });
});
it("prevents disabled Rating updates inherited from FormControl", async () => {
  const change = vi.fn();
  await render(
    <N.FormControl disabled>
      <N.Rating onChange={change} />
    </N.FormControl>,
  );
  await fireEvent(screen.getByRole("adjustable"), "accessibilityAction", {
    nativeEvent: { actionName: "increment" },
  });
  expect(change).not.toHaveBeenCalled();
});
it("honors TagInput Enter separator and shows empty suggestions", async () => {
  const change = vi.fn();
  await render(
    <N.TagInput
      accessibilityLabel="Tags"
      options={["alpha"]}
      separators={[","]}
      commitOnBlur={false}
      emptyText="No suggestions"
      onChange={change}
    />,
  );
  await fireEvent.changeText(screen.getByLabelText("Tags"), "beta");
  expect(screen.getByText("No suggestions")).toBeTruthy();
  await fireEvent(screen.getByLabelText("Tags"), "submitEditing");
  expect(change).not.toHaveBeenCalled();
  await fireEvent.press(screen.getByRole("button", { name: "Add tag" }));
  expect(change).toHaveBeenCalledWith(["beta"]);
});
it("shows initials for collapsed navigation entries without icons", async () => {
  await render(
    <N.NavTree
      collapsed
      sections={[
        { id: "main", items: [{ id: "overview", label: "Overview" }] },
      ]}
    />,
  );
  expect(screen.getByText("O")).toBeTruthy();
});
it("joins attached stack borders while preserving only outside corners", async () => {
  await render(
    <N.HStack attached>
      <N.Button>First</N.Button>
      <N.Button>Middle</N.Button>
      <N.Button>Last</N.Button>
    </N.HStack>,
  );
  expect(screen.getByRole("button", { name: "First" })).toHaveStyle({
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  });
  expect(screen.getByRole("button", { name: "Middle" })).toHaveStyle({
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginLeft: -1,
  });
  expect(screen.getByRole("button", { name: "Last" })).toHaveStyle({
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: -1,
  });
});
