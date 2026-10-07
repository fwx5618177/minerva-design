// Ported from @novel-isr/ui tests/e2e/navigation.test.tsx.
//
// E2E: navigation — Tabs keyboard model, PageTabs route strip, CommandDialog
// palette, NavTree sidebar. Runs through Minerva's native API (English
// built-in strings: "Command palette", "No matching results"); a final block
// replays a novel scenario verbatim through @minerva/lib-core/compat (novel
// prop names + Chinese defaults).
import { useState } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Button,
  CommandDialog,
  IconButton,
  NavTree,
  PageTab,
  PageTabs,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  type CommandItem,
  type NavTreeSection,
} from "@minerva/lib-core";
import * as compat from "@minerva/lib-core/compat";

describe("Tabs", () => {
  function BookDetail() {
    return (
      <Tabs defaultValue="overview">
        <TabList aria-label="书籍详情">
          <Tab value="overview">概览</Tab>
          <Tab value="reviews">书评</Tab>
          <Tab value="locked" disabled>
            付费章节
          </Tab>
          <Tab value="stats">数据</Tab>
        </TabList>
        <TabPanel value="overview">概览内容</TabPanel>
        <TabPanel value="reviews">书评内容</TabPanel>
        <TabPanel value="locked">付费内容</TabPanel>
        <TabPanel value="stats">数据内容</TabPanel>
      </Tabs>
    );
  }

  const selectedTab = () =>
    within(screen.getByRole("tablist", { name: "书籍详情" })).getByRole("tab", {
      selected: true,
    });

  it("arrow keys / Home / End move selection (automatic activation), skip disabled tabs and wrap", async () => {
    const user = userEvent.setup();
    render(<BookDetail />);

    expect(screen.getByRole("tabpanel")).toHaveTextContent("概览内容");
    await user.tab();
    expect(screen.getByRole("tab", { name: "概览" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(selectedTab()).toHaveTextContent("书评");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("书评内容");

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "数据" })).toHaveFocus();
    expect(selectedTab()).toHaveTextContent("数据");
    expect(screen.getByRole("tab", { name: "付费章节" })).toBeDisabled();

    await user.keyboard("{ArrowRight}");
    expect(selectedTab()).toHaveTextContent("概览");

    await user.keyboard("{End}");
    expect(selectedTab()).toHaveTextContent("数据");
    await user.keyboard("{Home}");
    expect(selectedTab()).toHaveTextContent("概览");
    await user.keyboard("{ArrowLeft}");
    expect(selectedTab()).toHaveTextContent("数据");

    expect(screen.getByRole("tabpanel")).toHaveAccessibleName("数据");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("数据内容");
  });

  // Ported from tests/browser/language-tabs.mjs (keyboard + panel linkage; colors/geometry dropped).
  it("manual activation: arrows move focus only, Enter selects; panel is linked via aria-controls", async () => {
    const user = userEvent.setup();
    const languages = ["en", "ja", "disabled", "zh-hans", "fr", "ko"];
    function Languages() {
      const [value, setValue] = useState("en");
      return (
        <Tabs
          value={value}
          onChange={setValue}
          variant="pills"
          activationMode="manual"
        >
          <TabList aria-label="Languages">
            {languages.map((lang) => (
              <Tab key={lang} value={lang} disabled={lang === "disabled"}>
                {lang}
              </Tab>
            ))}
          </TabList>
          <TabPanel value={value}>Notes for {value}</TabPanel>
        </Tabs>
      );
    }
    render(<Languages />);
    const list = screen.getByRole("tablist", { name: "Languages" });
    const selected = () => within(list).getByRole("tab", { selected: true });

    await user.click(within(list).getByRole("tab", { name: "en" }));
    await user.keyboard("{ArrowRight}");
    expect(within(list).getByRole("tab", { name: "ja" })).toHaveFocus();
    expect(selected()).toHaveTextContent("en");
    await user.keyboard("{Enter}");
    expect(selected()).toHaveTextContent("ja");

    await user.keyboard("{ArrowRight}");
    expect(within(list).getByRole("tab", { name: "zh-hans" })).toHaveFocus();
    await user.keyboard("{End}");
    expect(within(list).getByRole("tab", { name: "ko" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(selected()).toHaveTextContent("ko");

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent("Notes for ko");
    expect(selected()).toHaveAttribute("aria-controls", panel.id);
  });
});

describe("PageTabs", () => {
  // Ported from tests/browser/page-tabs-presentation.mjs (tooltip/aria, close action, disabled; geometry dropped).
  function Workspace() {
    const [pages, setPages] = useState([
      "home",
      "article",
      "settings",
      "archived",
    ]);
    const [active, setActive] = useState("article");
    const close = (page: string) => {
      setPages((prev) => prev.filter((p) => p !== page));
      if (page === active) setActive("home");
    };
    return (
      <>
        <PageTabs
          ariaLabel="Open pages"
          activeValue={active}
          actions={<IconButton label="Page menu">⋯</IconButton>}
        >
          {pages.map((page) => (
            <PageTab
              key={page}
              value={page}
              label={page === "article" ? "Article: a very long title" : page}
              active={active === page}
              disabled={page === "archived"}
              onSelect={() => setActive(page)}
              action={
                <IconButton
                  size="xsmall"
                  label={`Close ${page}`}
                  onClick={() => close(page)}
                >
                  ×
                </IconButton>
              }
            />
          ))}
        </PageTabs>
        <main>Viewing {active}</main>
      </>
    );
  }

  it("marks the current page, switches on click, and disabled pages cannot be opened", async () => {
    const user = userEvent.setup();
    render(<Workspace />);
    const nav = screen.getByRole("navigation", { name: "Open pages" });
    const article = within(nav).getByRole("button", {
      name: "Article: a very long title",
    });

    expect(nav.querySelector('[role="tablist"]')).toBeNull();
    expect(article).toHaveAttribute("aria-current", "page");
    expect(article).not.toHaveAttribute("title");

    await user.click(within(nav).getByRole("button", { name: "settings" }));
    expect(screen.getByRole("main")).toHaveTextContent("Viewing settings");
    expect(
      within(nav).getByRole("button", { name: "settings" }),
    ).toHaveAttribute("aria-current", "page");
    expect(article).not.toHaveAttribute("aria-current");

    const archived = within(nav).getByRole("button", { name: "archived" });
    expect(archived).toBeDisabled();
    await user.click(archived);
    expect(screen.getByRole("main")).toHaveTextContent("Viewing settings");
    expect(
      within(nav).getByRole("button", { name: "Page menu" }),
    ).toBeInTheDocument();
  });

  it("keyboard focus shows the full title in a tooltip that describes the trigger; Escape hides it", async () => {
    const user = userEvent.setup();
    render(<Workspace />);
    const nav = screen.getByRole("navigation", { name: "Open pages" });

    await user.tab();
    await user.tab();
    await user.tab();
    const article = within(nav).getByRole("button", {
      name: "Article: a very long title",
    });
    expect(article).toHaveFocus();
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Article: a very long title");
    expect(article).toHaveAccessibleDescription("Article: a very long title");
    expect(nav).not.toContainElement(tooltip);

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  });

  it("closing the focused page keeps keyboard focus on the current page instead of <body>", async () => {
    const user = userEvent.setup();
    render(<Workspace />);
    const nav = screen.getByRole("navigation", { name: "Open pages" });

    within(nav).getByRole("button", { name: "Close article" }).focus();
    await user.keyboard("{Enter}");

    expect(
      within(nav).queryByRole("button", { name: "Article: a very long title" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Viewing home");
    await waitFor(() =>
      expect(within(nav).getByRole("button", { name: "home" })).toHaveFocus(),
    );
  });
});

const COMMAND_ITEMS: CommandItem[] = [
  {
    id: "cmd-books",
    title: "书籍管理",
    description: "/admin/books",
    group: "内容",
  },
  {
    id: "cmd-reviews",
    title: "书评审核",
    description: "/admin/reviews",
    group: "内容",
    keywords: "moderation",
  },
  {
    id: "cmd-users",
    title: "用户列表",
    description: "/admin/users",
    group: "用户",
  },
  { id: "cmd-danger", title: "删除全部数据", disabled: true },
];

describe("CommandDialog", () => {
  function AdminShell() {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("/admin");
    return (
      <>
        <Button onClick={() => setOpen(true)}>打开命令面板</Button>
        <p>当前路由：{route}</p>
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          items={COMMAND_ITEMS}
          shortcut="mod+k"
          shortcutLabel="⌘K"
          onSelect={(item) => setRoute(item.description ?? item.id)}
        />
      </>
    );
  }

  it("opens with Ctrl/Cmd+K, filters while typing, arrow + Enter runs the highlighted command", async () => {
    const user = userEvent.setup();
    render(<AdminShell />);

    await user.keyboard("{Control>}k{/Control}");
    const dialog = await screen.findByRole("dialog", {
      name: /Command palette/,
    });
    const search = within(dialog).getByRole("combobox");
    await waitFor(() => expect(search).toHaveFocus());
    const options = () => within(dialog).getAllByRole("option");
    const activeOption = () => {
      const id = search.getAttribute("aria-activedescendant");
      return options().find((option) => id && option.id === id);
    };
    expect(
      options().map((o) => o.querySelector("strong")?.textContent),
    ).toEqual(["书籍管理", "书评审核", "用户列表"]);
    expect(options()[0]).toHaveAttribute("aria-selected", "true");

    await user.type(search, "admin");
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    expect(options()[2]).toHaveAttribute("aria-selected", "true");
    // Minerva generates scoped option ids instead of reusing item.id, so the
    // active descendant is resolved to its option rather than compared to "cmd-users".
    expect(activeOption()).toHaveTextContent("用户列表");
    await user.keyboard("{ArrowUp}");
    expect(activeOption()).toHaveTextContent("书评审核");
    await user.keyboard("{Enter}");

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("当前路由：/admin/reviews")).toBeInTheDocument();
  });

  it("matches keywords, shows the empty state, resets the query on reopen, and Escape closes", async () => {
    const user = userEvent.setup();
    render(<AdminShell />);

    await user.click(screen.getByRole("button", { name: "打开命令面板" }));
    let dialog = await screen.findByRole("dialog", {
      name: /Command palette/,
    });
    const search = within(dialog).getByRole("combobox");
    await waitFor(() => expect(search).toHaveFocus());

    await user.type(search, "MODERATION");
    expect(within(dialog).getAllByRole("option")).toHaveLength(1);
    await user.clear(search);
    await user.type(search, "删除");
    expect(within(dialog).queryByRole("option")).not.toBeInTheDocument();
    expect(within(dialog).getByText("No matching results")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("当前路由：/admin")).toBeInTheDocument();
    // Regression: CommandDialog used to drop focus to <body>; it now returns to the trigger.
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "打开命令面板" }),
      ).toHaveFocus(),
    );

    await user.click(screen.getByRole("button", { name: "打开命令面板" }));
    dialog = await screen.findByRole("dialog", { name: /Command palette/ });
    expect(within(dialog).getByRole("combobox")).toHaveValue("");
    await user.click(within(dialog).getByRole("option", { name: /用户列表/ }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("当前路由：/admin/users")).toBeInTheDocument();
  });
});

const NAV_SECTIONS: NavTreeSection[] = [
  {
    id: "content",
    title: "内容",
    items: [
      { id: "dashboard", label: "仪表盘", href: "#dashboard" },
      {
        id: "books",
        label: "书籍",
        children: [
          { id: "books-list", label: "书籍列表", href: "#books" },
          { id: "books-import", label: "批量导入", href: "#import" },
        ],
      },
      {
        id: "users",
        label: "用户",
        children: [{ id: "users-list", label: "用户列表", href: "#users" }],
      },
    ],
  },
];

describe("NavTree", () => {
  function Sidebar() {
    const [active, setActive] = useState("books-list");
    return (
      <NavTree
        ariaLabel="后台导航"
        sections={NAV_SECTIONS}
        activeId={active}
        renderLink={(item, content, state) => (
          <button
            key={item.id}
            type="button"
            className={state.className}
            aria-current={state.active ? "page" : undefined}
            onClick={() => setActive(item.id)}
          >
            {content}
          </button>
        )}
      />
    );
  }

  it("auto-expands the active branch, lets the user collapse it, and expands siblings on demand", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);
    const nav = screen.getByRole("navigation", { name: "后台导航" });
    const books = within(nav).getByRole("button", { name: "书籍" });
    const users = within(nav).getByRole("button", { name: "用户" });

    expect(
      within(nav).getByRole("heading", { name: "内容" }),
    ).toBeInTheDocument();
    expect(books).toHaveAttribute("aria-expanded", "true");
    expect(
      within(nav).getByRole("button", { name: "书籍列表" }),
    ).toHaveAttribute("aria-current", "page");
    expect(users).toHaveAttribute("aria-expanded", "false");
    expect(
      within(nav).queryByRole("button", { name: "用户列表" }),
    ).not.toBeInTheDocument();

    // Collapsing the branch containing the active page sticks.
    await user.click(books);
    expect(books).toHaveAttribute("aria-expanded", "false");
    expect(
      within(nav).queryByRole("button", { name: "书籍列表" }),
    ).not.toBeInTheDocument();

    // Keyboard: expand "用户" with Enter and navigate into it.
    users.focus();
    await user.keyboard("{Enter}");
    expect(users).toHaveAttribute("aria-expanded", "true");
    await user.tab();
    expect(within(nav).getByRole("button", { name: "用户列表" })).toHaveFocus();
    await user.keyboard(" ");
    expect(
      within(nav).getByRole("button", { name: "用户列表" }),
    ).toHaveAttribute("aria-current", "page");
    expect(books).toHaveAttribute("aria-expanded", "false");

    await user.click(books);
    expect(
      within(nav).getByRole("button", { name: "书籍列表" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("default links render as anchors with aria-current", () => {
    render(
      <NavTree ariaLabel="站点" sections={NAV_SECTIONS} activeId="dashboard" />,
    );
    const link = screen.getByRole("link", { name: "仪表盘" });
    expect(link).toHaveAttribute("href", "#dashboard");
    expect(link).toHaveAttribute("aria-current", "page");
  });
});

describe("via @minerva/lib-core/compat", () => {
  it("Tabs: manual activation with novel onValueChange; Enter selects", async () => {
    const user = userEvent.setup();
    function Languages() {
      const [value, setValue] = useState("en");
      return (
        <compat.Tabs
          value={value}
          onValueChange={setValue}
          variant="pills"
          activationMode="manual"
        >
          <compat.TabList aria-label="Languages">
            {["en", "ja", "ko"].map((lang) => (
              <compat.Tab key={lang} value={lang}>
                {lang}
              </compat.Tab>
            ))}
          </compat.TabList>
          <compat.TabPanel value={value}>Notes for {value}</compat.TabPanel>
        </compat.Tabs>
      );
    }
    render(<Languages />);
    const list = screen.getByRole("tablist", { name: "Languages" });
    await user.click(within(list).getByRole("tab", { name: "en" }));
    await user.keyboard("{ArrowRight}");
    expect(within(list).getByRole("tab", { selected: true })).toHaveTextContent(
      "en",
    );
    await user.keyboard("{Enter}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Notes for ja");
  });

  it("CommandDialog: matches keywords, shows the empty state, resets the query on reopen, and Escape closes", async () => {
    const user = userEvent.setup();
    function AdminShell() {
      const [open, setOpen] = useState(false);
      const [route, setRoute] = useState("/admin");
      return (
        <>
          <compat.Button onClick={() => setOpen(true)}>
            打开命令面板
          </compat.Button>
          <p>当前路由：{route}</p>
          <compat.CommandDialog
            isOpen={open}
            onOpenChange={setOpen}
            items={COMMAND_ITEMS}
            shortcut="mod+k"
            shortcutLabel="⌘K"
            onSelect={(item) => setRoute(item.description ?? item.id)}
          />
        </>
      );
    }
    render(<AdminShell />);

    await user.click(screen.getByRole("button", { name: "打开命令面板" }));
    let dialog = await screen.findByRole("dialog", { name: /命令面板/ });
    const search = within(dialog).getByRole("combobox");
    await waitFor(() => expect(search).toHaveFocus());

    // novel-isr-ui uses each item's id as the option id / active descendant.
    await user.type(search, "admin");
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    expect(within(dialog).getAllByRole("option")[2]).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(search).toHaveAttribute("aria-activedescendant", "cmd-users");
    await user.keyboard("{ArrowUp}");
    expect(search).toHaveAttribute("aria-activedescendant", "cmd-reviews");
    await user.clear(search);

    await user.type(search, "MODERATION");
    expect(within(dialog).getAllByRole("option")).toHaveLength(1);
    await user.clear(search);
    await user.type(search, "删除");
    expect(within(dialog).queryByRole("option")).not.toBeInTheDocument();
    expect(within(dialog).getByText("没有匹配结果")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("当前路由：/admin")).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "打开命令面板" }),
      ).toHaveFocus(),
    );

    await user.click(screen.getByRole("button", { name: "打开命令面板" }));
    dialog = await screen.findByRole("dialog", { name: /命令面板/ });
    expect(within(dialog).getByRole("combobox")).toHaveValue("");
    await user.click(within(dialog).getByRole("option", { name: /用户列表/ }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("当前路由：/admin/users")).toBeInTheDocument();
  });

  it("PageTabs + NavTree: novel label / aria-label / IconButton size props", () => {
    render(
      <>
        <compat.PageTabs
          label="Open pages"
          activeValue="home"
          actions={<compat.IconButton label="Page menu">⋯</compat.IconButton>}
        >
          <compat.PageTab
            value="home"
            label="home"
            active
            action={
              <compat.IconButton size="xs" label="Close home">
                ×
              </compat.IconButton>
            }
          />
        </compat.PageTabs>
        <compat.NavTree
          aria-label="站点"
          sections={NAV_SECTIONS}
          activeId="dashboard"
        />
      </>,
    );
    const nav = screen.getByRole("navigation", { name: "Open pages" });
    expect(within(nav).getByRole("button", { name: "home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      within(nav).getByRole("button", { name: "Close home" }),
    ).toBeInTheDocument();
    const link = within(
      screen.getByRole("navigation", { name: "站点" }),
    ).getByRole("link", { name: "仪表盘" });
    expect(link).toHaveAttribute("aria-current", "page");
  });
});
