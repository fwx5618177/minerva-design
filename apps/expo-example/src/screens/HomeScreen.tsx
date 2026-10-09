// App shell: a NavBar, the content of the selected tab, and a TabBar at the
// bottom (Components / Theme / About).
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  Avatar,
  Card,
  Cell,
  CellGroup,
  NavBar,
  TabBar,
  TabBarItem,
  Tag,
  useI18n,
  useTheme,
} from "minerva-design/native";
import { useNavigation, type CategoryRoute } from "../navigation";
import { Glyph, Paragraph, Row } from "../ui";
import { ThemingContent } from "./ThemingScreen";

type HomeTab = "components" | "theme" | "about";

const CATEGORIES: readonly {
  route: CategoryRoute;
  title: string;
  label: string;
  glyph: string;
  count: number;
}[] = [
  {
    route: "advanced",
    title: "Advanced components",
    label: "Tables, editors, menus, layouts and document preview",
    glyph: "▤",
    count: 35,
  },
  {
    route: "document-preview",
    title: "Document preview",
    label: "Isolated platform document host",
    glyph: "▤",
    count: 1,
  },
  {
    route: "virtual-list",
    title: "Virtual list",
    label: "10,000 rows with native windowing",
    glyph: "☷",
    count: 1,
  },
  {
    route: "general",
    title: "General",
    label: "Button, IconButton, Divider",
    glyph: "◉",
    count: 3,
  },
  {
    route: "forms",
    title: "Forms",
    label: "Form, Input, Checkbox, Radio, Switch, Rating...",
    glyph: "✎",
    count: 13,
  },
  {
    route: "feedback",
    title: "Feedback",
    label: "Alert, Toast, Progress, Loading, Skeleton, Empty",
    glyph: "◔",
    count: 6,
  },
  {
    route: "overlays",
    title: "Overlays",
    label: "Dialog, ActionSheet, Popup, Select, Picker, Calendar...",
    glyph: "❏",
    count: 10,
  },
  {
    route: "navigation",
    title: "Navigation",
    label: "NavBar, Tabs, Steps, Pagination",
    glyph: "➜",
    count: 4,
  },
  {
    route: "data",
    title: "Data display",
    label: "Avatar, Badge, Tag, Cell, Card",
    glyph: "▤",
    count: 5,
  },
  {
    route: "mobile",
    title: "Mobile",
    label: "TabBar, PullRefresh, SwipeCell, Collapse, Grid, SearchBar",
    glyph: "▯",
    count: 6,
  },
  {
    route: "theming",
    title: "Theming",
    label: "ThemeToggle, PaletteToggle, PresetToggle, locales, tokens",
    glyph: "◐",
    count: 4,
  },
];

function ComponentsTab() {
  const { colors, tokens } = useTheme();
  const { push } = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: tokens.space["4"],
        gap: tokens.space["4"],
      }}
    >
      <View style={{ paddingHorizontal: tokens.space["4"] }}>
        <Text
          style={{
            color: colors["text-color"],
            fontSize: tokens.fontSize["2xl"],
            fontWeight: "700",
          }}
        >
          Minerva Native
        </Text>
        <Paragraph muted>
          Every component of minerva-design/native, grouped by category.
        </Paragraph>
      </View>
      <CellGroup title="Categories" inset>
        {CATEGORIES.map((c) => (
          <Cell
            key={c.route}
            title={c.title}
            label={c.label}
            value={String(c.count)}
            icon={<Glyph color={colors["primary-color"]}>{c.glyph}</Glyph>}
            isLink
            center
            onPress={() => push(c.route)}
            testID={`category-${c.route}`}
          />
        ))}
      </CellGroup>
    </ScrollView>
  );
}

function AboutTab() {
  const { tokens, mode, design, palette } = useTheme();
  const { language } = useI18n();
  return (
    <ScrollView
      contentContainerStyle={{
        padding: tokens.space["4"],
        gap: tokens.space["4"],
      }}
    >
      <Card
        variant="elevated"
        title="minerva-design/native"
        description="React Native + Expo components on the platform-neutral Minerva core"
        extra={<Avatar name="Minerva" size="small" />}
      >
        <Row>
          <Tag color="primary" variant="subtle">
            Expo SDK 57
          </Tag>
          <Tag color="info" variant="subtle">
            React Native 0.86
          </Tag>
          <Tag color="success" variant="subtle">
            React 19
          </Tag>
        </Row>
      </Card>
      <CellGroup title="Runtime" inset>
        <Cell title="Color mode" value={mode} />
        <Cell title="Design preset" value={design.preset} />
        <Cell title="Palette" value={palette ?? "default"} />
        <Cell title="Language" value={language} />
      </CellGroup>
      <Paragraph muted>
        A private example app (not deployed). Navigation is a plain React state
        stack, so the app has no router dependency.
      </Paragraph>
    </ScrollView>
  );
}

export function HomeScreen() {
  const { colors, tokens } = useTheme();
  const [tab, setTab] = useState<HomeTab>("components");
  const titles: Record<HomeTab, string> = {
    components: "Components",
    theme: "Theme",
    about: "About",
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors["canvas-color"] }}>
      <NavBar title={titles[tab]} />
      <View style={{ flex: 1 }}>
        {tab === "components" ? <ComponentsTab /> : null}
        {tab === "theme" ? (
          <ScrollView
            contentContainerStyle={{
              padding: tokens.space["4"],
              paddingBottom: tokens.space["8"],
            }}
          >
            <ThemingContent />
          </ScrollView>
        ) : null}
        {tab === "about" ? <AboutTab /> : null}
      </View>
      <TabBar value={tab} onChange={(v) => setTab(v as HomeTab)}>
        <TabBarItem
          value="components"
          label="Components"
          icon={(_, color) => <Glyph color={color}>▦</Glyph>}
        />
        <TabBarItem
          value="theme"
          label="Theme"
          icon={(_, color) => <Glyph color={color}>◐</Glyph>}
        />
        <TabBarItem
          value="about"
          label="About"
          icon={(_, color) => <Glyph color={color}>ⓘ</Glyph>}
          dot
        />
      </TabBar>
    </View>
  );
}
