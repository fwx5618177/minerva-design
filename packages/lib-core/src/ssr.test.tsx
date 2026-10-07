// @vitest-environment node
// Every public component must render on the server: no window / document
// access during render or module initialisation.
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import * as lib from "./index";

const {
  Alert,
  AutoComplete,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Cascader,
  Checkbox,
  Chip,
  ConfigProvider,
  Divider,
  Dropdown,
  Empty,
  IconButton,
  InteractiveIconButton,
  Pagination,
  Popper,
  ProgressIndicator,
  Radio,
  RadioGroup,
  SearchButton,
  Skeleton,
  Space,
  StatusIndicator,
  Switch,
  Tag,
  TextField,
  TimePicker,
  Tooltip,
  VirtualList,
} = lib;

const cases: Array<[string, React.ReactElement]> = [
  [
    "Alert",
    <Alert variant="info" title="Title" closable>
      Body
    </Alert>,
  ],
  [
    "AutoComplete",
    <AutoComplete name="a" label="A" options={[{ label: "x", value: "x" }]} />,
  ],
  ["Avatar", <Avatar name="Ada Lovelace" />],
  [
    "AvatarGroup",
    <AvatarGroup>
      <Avatar name="A" />
      <Avatar name="B" />
    </AvatarGroup>,
  ],
  [
    "Badge",
    <Badge content={3}>
      <span>Inbox</span>
    </Badge>,
  ],
  ["Button", <Button>Click</Button>],
  [
    "Card",
    <Card>
      <CardHeader>
        <CardTitle>T</CardTitle>
        <CardDescription>D</CardDescription>
      </CardHeader>
      <CardContent>C</CardContent>
      <CardFooter>F</CardFooter>
    </Card>,
  ],
  [
    "Cascader",
    <Cascader
      name="c"
      label="C"
      options={[{ value: "a", label: "A" }]}
      defaultValue={["a"]}
    />,
  ],
  ["Checkbox", <Checkbox label="Check" defaultChecked />],
  ["Chip", <Chip label="Chip" onDelete={() => {}} />],
  ["Divider", <Divider>Text</Divider>],
  ["Dropdown", <Dropdown items={[{ label: "One", value: "1" }]} defaultOpen />],
  ["Empty", <Empty />],
  [
    "IconButton",
    <IconButton
      icon={<span />}
      ariaLabel="Icon"
      showTooltip
      tooltip={{ content: "Tip" }}
    />,
  ],
  ["InteractiveIconButton", <InteractiveIconButton type="favorite" />],
  [
    "Pagination",
    <Pagination total={100} showQuickJumper showSizeChanger showTotal />,
  ],
  [
    "Popper",
    <Popper anchorEl={null} visible>
      Content
    </Popper>,
  ],
  ["ProgressIndicator", <ProgressIndicator />],
  ["Radio", <Radio label="Radio" value="r" />],
  [
    "RadioGroup",
    <RadioGroup label="Group" defaultValue="a">
      <Radio value="a" label="A" />
    </RadioGroup>,
  ],
  ["SearchButton", <SearchButton />],
  ["Skeleton", <Skeleton loading />],
  [
    "Space",
    <Space>
      <span>a</span>
      <span>b</span>
    </Space>,
  ],
  ["StatusIndicator", <StatusIndicator type="online" />],
  ["Switch", <Switch label="Switch" defaultChecked />],
  [
    "Tag",
    <Tag closable clickable>
      Tag
    </Tag>,
  ],
  ["TextField", <TextField name="t" label="T" defaultValue="v" clearable />],
  ["TimePicker", <TimePicker defaultValue={new Date(2024, 0, 1, 9, 30, 0)} />],
  [
    "Tooltip",
    <Tooltip content="Tip" defaultOpen>
      <button type="button">T</button>
    </Tooltip>,
  ],
  [
    "VirtualList",
    <VirtualList
      items={[{ id: 1 }, { id: 2 }]}
      maxHeight={100}
      itemHeight={20}
      renderItem={(item) => <span>{item.id}</span>}
    />,
  ],
];

describe("SSR", () => {
  it("runs without a DOM", () => {
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
  });

  it.each(cases)("renders %s to a string", (_, element) => {
    const html = renderToString(
      <ConfigProvider theme="auto">{element}</ConfigProvider>,
    );
    expect(typeof html).toBe("string");
  });

  it("covers every exported component", () => {
    const tested = new Set(cases.map(([name]) => name));
    const components = Object.keys(lib).filter(
      (name) =>
        /^[A-Z]/.test(name) &&
        !["ConfigContext", "ConfigProvider"].includes(name) &&
        !/^Card.+/.test(name), // Card sub-components are rendered by "Card"
    );
    for (const name of components) {
      expect(tested.has(name), `${name} has an SSR case`).toBe(true);
    }
  });
});
