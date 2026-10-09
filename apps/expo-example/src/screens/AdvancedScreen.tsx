import { useState } from "react";
import { Text } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import {
  AutoComplete,
  Button,
  Cascader,
  CodeBlock,
  CodeEditor,
  CommandDialog,
  ConfirmProvider,
  useConfirm,
  ContextMenu,
  DataTable,
  DescriptionList,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormLayout,
  HtmlPreview,
  Input,
  JsonField,
  KeyValueEditor,
  List,
  ListItem,
  Menu,
  NavTree,
  PageHeader,
  PageSection,
  PageTab,
  PageTabs,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  Prose,
  RatingScale,
  ResponsiveGrid,
  SplitLayout,
  Stack,
  StatCard,
  TagInput,
  TextLink,
  TimePicker,
  Toolbar,
  Tooltip,
  Upload,
  type UploadItem,
} from "minerva-design/native";
import { Screen, Section, Paragraph } from "../ui";
import { HtmlDocument } from "../adapters/HtmlDocument";
const records = [
  { id: "a", name: "Ada", role: "Engineer" },
  { id: "b", name: "Grace", role: "Scientist" },
  { id: "c", name: "Lin", role: "Designer" },
];
function AdvancedContent() {
  const [result, setResult] = useState("");
  const [commands, setCommands] = useState(false);
  const [files, setFiles] = useState<UploadItem[]>([]);
  const [tab, setTab] = useState("overview");
  const [scores, setScores] = useState({ quality: 8, speed: 6 });
  const confirm = useConfirm();
  return (
    <Screen title="Advanced components">
      <PageHeader
        title="Workspace"
        description="Data, editing and navigation"
        actions={<Button onPress={() => setCommands(true)}>Commands</Button>}
      />
      <Section title="Data table">
        <DataTable
          data={records}
          columns={[
            { key: "name", header: "Name", sortable: true },
            { key: "role", header: "Role" },
          ]}
          rowKey={(row) => row.id}
          rowSelection={{
            onChange: (keys) => setResult(`Selected ${keys.join(", ")}`),
          }}
          pagination={{ total: 3, pageSize: 3 }}
        />
      </Section>
      <Section title="Suggestions and hierarchical selection">
        <AutoComplete
          label="Component search"
          options={["Button", "Table", "Tooltip"].map((label) => ({
            value: label,
            label,
          }))}
          onSelect={(item) => setResult(item.label)}
        />
        <Cascader
          label="Region"
          showSearch
          allowClear
          options={[
            {
              value: "china",
              label: "China",
              children: [
                { value: "shanghai", label: "Shanghai" },
                { value: "beijing", label: "Beijing" },
              ],
            },
            {
              value: "france",
              label: "France",
              children: [{ value: "paris", label: "Paris" }],
            },
          ]}
          onChange={(_, path) =>
            setResult(path.map((item) => item.label).join(" / "))
          }
        />
        <TimePicker label="Appointment time" showSecond={false} />
      </Section>
      <Section title="Structured editing">
        <TagInput
          accessibilityLabel="Tags"
          options={["design", "native", "accessible"]}
        />
        <KeyValueEditor
          defaultEntries={[{ id: "a", key: "theme", value: "dark" }]}
        />
        <JsonField
          accessibilityLabel="JSON settings"
          defaultValue={'{"theme":"dark","version":9007199254740993}'}
        />
        <CodeEditor
          label="Source code"
          defaultValue={'const name = "Minerva";'}
          format={(source) => source.trimEnd() + "\n"}
        />
        <CodeBlock
          copyable
          copyText={async (text) => {
            await Clipboard.setStringAsync(text);
          }}
        >
          {'import { Button } from "minerva-design/native";'}
        </CodeBlock>
      </Section>
      <Section title="Attachments" description="Choose files from this device.">
        <Upload
          label="Documents"
          multiple
          accept="*/*"
          value={files}
          labels={{ done: "Selected" }}
          pickFiles={async ({ multiple }) => {
            const response = await DocumentPicker.getDocumentAsync({
              multiple,
              copyToCacheDirectory: true,
              type: "*/*",
            });
            return response.canceled
              ? null
              : response.assets.map((file) => ({
                  uri: file.uri,
                  name: file.name,
                  mimeType: file.mimeType,
                  size: file.size,
                }));
          }}
          onFilesSelected={(selected) =>
            setFiles((current) => [
              ...current,
              ...selected.map((file, index) => ({
                id: `${Date.now()}-${index}`,
                name: file.name,
                status: "done" as const,
              })),
            ])
          }
          onRemove={(file) =>
            setFiles((current) => current.filter((item) => item.id !== file.id))
          }
        />
      </Section>
      <Section title="Menus and contextual help">
        <Menu
          items={[
            { key: "save", label: "Save" },
            {
              type: "checkbox",
              key: "grid",
              label: "Show grid",
              defaultChecked: true,
            },
            {
              key: "more",
              label: "More",
              children: [{ key: "archive", label: "Archive" }],
            },
          ]}
          onSelect={(item) => setResult(item.key)}
        >
          <Button>Open menu</Button>
        </Menu>
        <ContextMenu
          items={[{ key: "copy", label: "Copy name" }]}
          onSelect={(item) => setResult(item.key)}
        >
          <Button variant="outline">Long press for actions</Button>
        </ContextMenu>
        <Tooltip content="Long press or focus reveals this explanation">
          <Button variant="ghost">Help</Button>
        </Tooltip>
        <Popover>
          <PopoverTrigger>Details</PopoverTrigger>
          <PopoverContent title="Account details">
            <Paragraph>Signed in as Ada.</Paragraph>
            <PopoverClose>Done</PopoverClose>
          </PopoverContent>
        </Popover>
        <Button
          color="danger"
          onPress={async () =>
            setResult(
              (await confirm({
                title: "Archive this record?",
                description: "You can restore it later.",
                confirmLabel: "Archive",
              }))
                ? "Archived"
                : "Kept",
            )
          }
        >
          Confirm archive
        </Button>
      </Section>
      <CommandDialog
        open={commands}
        onOpenChange={setCommands}
        items={[
          { id: "settings", title: "Settings", keywords: "preferences" },
          { id: "profile", title: "Profile", description: "Edit your account" },
        ]}
        onSelect={(item) => setResult(item.title)}
      />
      <Section title="Layout and presentation">
        <ResponsiveGrid columns={{ base: 1, md: 2 }}>
          <StatCard label="Projects" value={3} />
          <StatCard label="Errors" value={0} />
        </ResponsiveGrid>
        <SplitLayout aside={<Paragraph>Related information</Paragraph>}>
          <Prose>
            A native text layout with readable line spacing and selectable
            content.
          </Prose>
        </SplitLayout>
        <DescriptionList
          bordered
          items={[
            { key: "owner", label: "Owner", value: "Ada" },
            { key: "members", label: "Members", value: 3 },
          ]}
        />
        <List bordered>
          <ListItem
            primary="Workspace"
            secondary="Personal account"
            actions={
              <Button
                variant="link"
                onPress={() => setResult("Opened workspace")}
              >
                Open
              </Button>
            }
          />
        </List>
        <TextLink href="https://reactnative.dev">
          React Native documentation
        </TextLink>
        <PageSection title="Quality">
          <RatingScale
            dimensions={[
              { key: "quality", label: "Quality", value: scores.quality },
              { key: "speed", label: "Speed", value: scores.speed },
            ]}
            onChange={(key, value) =>
              setScores((current) => ({ ...current, [key]: value }))
            }
          />
        </PageSection>
      </Section>
      <Section title="Composed forms">
        <FormLayout columns={{ base: 1, md: 2 }}>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input placeholder="you@example.com" />
            <FormHelperText>For order updates</FormHelperText>
          </FormControl>
          <FormControl invalid>
            <FormLabel>Reference</FormLabel>
            <Input />
            <FormErrorMessage>A reference is required.</FormErrorMessage>
          </FormControl>
        </FormLayout>
      </Section>
      <Section title="Page navigation">
        <PageTabs activeValue={tab} accessibilityLabel="Open pages">
          <PageTab
            value="overview"
            label="Overview"
            onSelect={() => setTab("overview")}
          />
          <PageTab
            value="settings"
            label="Settings"
            onSelect={() => setTab("settings")}
          />
        </PageTabs>
        <NavTree
          sections={[
            {
              id: "workspace",
              title: "Workspace",
              items: [
                {
                  id: "pages",
                  label: "Pages",
                  children: [
                    { id: "overview", label: "Overview" },
                    { id: "settings", label: "Settings" },
                  ],
                },
              ],
            },
          ]}
          activeId={tab}
          onItemSelect={(item) => setTab(item.id)}
        />
      </Section>
      <Section title="HTML preview">
        <HtmlPreview
          html="<h1>Welcome</h1><p>A readable document preview.</p>"
          title="Document preview"
          height={220}
          renderDocument={HtmlDocument}
        />
      </Section>
      <Toolbar>
        <Button variant="outline" onPress={() => setResult("Saved")}>
          Save
        </Button>
        <Button variant="ghost" onPress={() => setResult("")}>
          Clear result
        </Button>
      </Toolbar>
      <Stack gap={2}>
        <Text accessibilityLiveRegion="polite">{result}</Text>
      </Stack>
    </Screen>
  );
}
export function AdvancedScreen() {
  return (
    <ConfirmProvider>
      <AdvancedContent />
    </ConfirmProvider>
  );
}
