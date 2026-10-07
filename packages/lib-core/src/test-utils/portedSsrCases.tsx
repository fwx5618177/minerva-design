// SSR cases for the components ported from @novel-isr/ui (used by
// ssr.test.tsx, which renders every case in a DOM-less Node environment).
import type { ReactElement } from "react";
import * as lib from "../index";

const noop = () => {};

export const portedCases: Array<[string, ReactElement]> = [
  ["ThemeToggle", <lib.ThemeToggle />],
  ["PaletteToggle", <lib.PaletteToggle />],
  [
    "ThemeProvider",
    <lib.ThemeProvider defaultPalette="tech">x</lib.ThemeProvider>,
  ],
  ["Box", <lib.Box p={2}>Box</lib.Box>],
  [
    "Stack",
    <lib.Stack gap={2}>
      <span>a</span>
    </lib.Stack>,
  ],
  [
    "HStack",
    <lib.HStack>
      <span>a</span>
    </lib.HStack>,
  ],
  [
    "VStack",
    <lib.VStack>
      <span>a</span>
    </lib.VStack>,
  ],
  [
    "ResponsiveGrid",
    <lib.ResponsiveGrid>
      <lib.GridItem>a</lib.GridItem>
    </lib.ResponsiveGrid>,
  ],
  ["GridItem", <lib.GridItem>a</lib.GridItem>],
  [
    "SplitLayout",
    <lib.SplitLayout aside={<nav>aside</nav>}>main</lib.SplitLayout>,
  ],
  [
    "Page",
    <lib.Page>
      <lib.PageHeader title="Title" />
      <lib.PageSection title="Section">
        <lib.Toolbar>
          <span>t</span>
        </lib.Toolbar>
        <lib.StatCard label="Users" value={42} />
      </lib.PageSection>
    </lib.Page>,
  ],
  ["PageHeader", <lib.PageHeader title="Title" />],
  ["PageSection", <lib.PageSection title="S">x</lib.PageSection>],
  ["StatCard", <lib.StatCard label="L" value="1" />],
  ["Toolbar", <lib.Toolbar>t</lib.Toolbar>],
  [
    "AppShell",
    <lib.AppShell brand="Brand" navigation={() => <nav>nav</nav>}>
      Main
    </lib.AppShell>,
  ],
  ["Spinner", <lib.Spinner />],
  ["LoadingState", <lib.LoadingState />],
  ["TextLink", <lib.TextLink href="/x">Link</lib.TextLink>],
  [
    "DescriptionList",
    <lib.DescriptionList items={[{ key: "a", label: "A", value: "1" }]} />,
  ],
  [
    "List",
    <lib.List>
      <lib.ListItem primary="Item" />
    </lib.List>,
  ],
  ["ListItem", <lib.ListItem primary="Item" />],
  ["CodeBlock", <lib.CodeBlock>{"const a = 1;"}</lib.CodeBlock>],
  [
    "Prose",
    <lib.Prose>
      <p>Text</p>
    </lib.Prose>,
  ],
  ["SkeletonText", <lib.SkeletonText />],
  [
    "FormControl",
    <lib.FormControl invalid required>
      <lib.FormLabel>Name</lib.FormLabel>
      <lib.Input />
      <lib.FormHelperText>Help</lib.FormHelperText>
      <lib.FormErrorMessage>Error</lib.FormErrorMessage>
    </lib.FormControl>,
  ],
  ["FormLabel", <lib.FormLabel>L</lib.FormLabel>],
  ["FormHelperText", <lib.FormHelperText>H</lib.FormHelperText>],
  ["FormErrorMessage", <lib.FormErrorMessage>E</lib.FormErrorMessage>],
  [
    "FormField",
    <lib.FormField label="Email">
      <lib.Input />
    </lib.FormField>,
  ],
  [
    "FormLayout",
    <lib.FormLayout>
      <lib.FormField label="A">
        <lib.Input />
      </lib.FormField>
    </lib.FormLayout>,
  ],
  ["Input", <lib.Input placeholder="x" />],
  ["Textarea", <lib.Textarea defaultValue="x" />],
  ["NumberInput", <lib.NumberInput defaultValue={3} />],
  ["JsonField", <lib.JsonField defaultValue='{"a":1}' />],
  [
    "KeyValueEditor",
    <lib.KeyValueEditor
      entries={[{ id: "1", key: "k", value: "v" }]}
      onChange={noop}
    />,
  ],
  ["TagInput", <lib.TagInput value={["a"]} onChange={noop} />],
  [
    "Select",
    <lib.Select placeholder="Pick" defaultValue="a">
      <lib.SelectGroup>
        <lib.SelectLabel>Group</lib.SelectLabel>
        <lib.SelectItem value="a">A</lib.SelectItem>
        <lib.SelectSeparator />
      </lib.SelectGroup>
    </lib.Select>,
  ],
  [
    "SelectItem",
    <lib.Select defaultValue="a">
      <lib.SelectItem value="a">A</lib.SelectItem>
    </lib.Select>,
  ],
  [
    "SelectGroup",
    <lib.Select>
      <lib.SelectGroup>
        <lib.SelectItem value="a">A</lib.SelectItem>
      </lib.SelectGroup>
    </lib.Select>,
  ],
  [
    "SelectLabel",
    <lib.Select>
      <lib.SelectGroup>
        <lib.SelectLabel>L</lib.SelectLabel>
      </lib.SelectGroup>
    </lib.Select>,
  ],
  [
    "SelectSeparator",
    <lib.Select>
      <lib.SelectSeparator />
    </lib.Select>,
  ],
  ["Rating", <lib.Rating value={3.5} />],
  [
    "RatingScale",
    <lib.RatingScale dimensions={[{ key: "plot", label: "Plot", value: 4 }]} />,
  ],
  [
    "MonthCalendar",
    <lib.MonthCalendar
      defaultMonth={new Date(2024, 0, 1)}
      events={[{ id: "1", date: "2024-01-05", title: "E" }]}
    />,
  ],
  [
    "Modal",
    <lib.Modal open title="Title">
      Body
    </lib.Modal>,
  ],
  [
    "ModalRoot",
    <lib.ModalRoot open>
      <lib.ModalTrigger>Open</lib.ModalTrigger>
      <lib.ModalContent>
        <lib.ModalHeader>H</lib.ModalHeader>
        <lib.ModalBody>B</lib.ModalBody>
        <lib.ModalFooter>
          <lib.ModalClose>Close</lib.ModalClose>
        </lib.ModalFooter>
      </lib.ModalContent>
    </lib.ModalRoot>,
  ],
  [
    "ModalTrigger",
    <lib.ModalRoot>
      <lib.ModalTrigger>Open</lib.ModalTrigger>
    </lib.ModalRoot>,
  ],
  [
    "ModalClose",
    <lib.ModalRoot>
      <lib.ModalClose>Close</lib.ModalClose>
    </lib.ModalRoot>,
  ],
  [
    "ModalContent",
    <lib.ModalRoot>
      <lib.ModalContent>C</lib.ModalContent>
    </lib.ModalRoot>,
  ],
  [
    "ModalHeader",
    <lib.ModalRoot open>
      <lib.ModalContent>
        <lib.ModalHeader>H</lib.ModalHeader>
      </lib.ModalContent>
    </lib.ModalRoot>,
  ],
  ["ModalBody", <lib.ModalBody>B</lib.ModalBody>],
  ["ModalFooter", <lib.ModalFooter>F</lib.ModalFooter>],
  [
    "ConfirmDialog",
    <lib.ConfirmDialog
      open
      onOpenChange={noop}
      onConfirm={noop}
      title="Sure?"
    />,
  ],
  ["ConfirmProvider", <lib.ConfirmProvider>x</lib.ConfirmProvider>],
  [
    "Drawer",
    <lib.Drawer open title="Filters">
      Body
    </lib.Drawer>,
  ],
  [
    "DrawerRoot",
    <lib.DrawerRoot open>
      <lib.DrawerTrigger>Open</lib.DrawerTrigger>
      <lib.DrawerContent>
        <lib.DrawerHeader>H</lib.DrawerHeader>
        <lib.DrawerBody>B</lib.DrawerBody>
        <lib.DrawerFooter>
          <lib.DrawerClose>Close</lib.DrawerClose>
        </lib.DrawerFooter>
      </lib.DrawerContent>
    </lib.DrawerRoot>,
  ],
  [
    "DrawerTrigger",
    <lib.DrawerRoot>
      <lib.DrawerTrigger>Open</lib.DrawerTrigger>
    </lib.DrawerRoot>,
  ],
  [
    "DrawerClose",
    <lib.DrawerRoot>
      <lib.DrawerClose>Close</lib.DrawerClose>
    </lib.DrawerRoot>,
  ],
  [
    "DrawerContent",
    <lib.DrawerRoot>
      <lib.DrawerContent>C</lib.DrawerContent>
    </lib.DrawerRoot>,
  ],
  [
    "DrawerHeader",
    <lib.DrawerRoot open>
      <lib.DrawerContent>
        <lib.DrawerHeader>H</lib.DrawerHeader>
      </lib.DrawerContent>
    </lib.DrawerRoot>,
  ],
  ["DrawerBody", <lib.DrawerBody>B</lib.DrawerBody>],
  ["DrawerFooter", <lib.DrawerFooter>F</lib.DrawerFooter>],
  [
    "CommandDialog",
    <lib.CommandDialog
      open
      items={[{ id: "a", title: "Alpha" }]}
      onSelect={noop}
    />,
  ],
  [
    "Popover",
    <lib.Popover>
      <lib.PopoverTrigger>Open</lib.PopoverTrigger>
      <lib.PopoverAnchor />
      <lib.PopoverContent>
        C<lib.PopoverClose>x</lib.PopoverClose>
      </lib.PopoverContent>
    </lib.Popover>,
  ],
  [
    "PopoverTrigger",
    <lib.Popover>
      <lib.PopoverTrigger>Open</lib.PopoverTrigger>
    </lib.Popover>,
  ],
  [
    "PopoverAnchor",
    <lib.Popover>
      <lib.PopoverAnchor />
    </lib.Popover>,
  ],
  [
    "PopoverClose",
    <lib.Popover>
      <lib.PopoverClose>x</lib.PopoverClose>
    </lib.Popover>,
  ],
  [
    "PopoverContent",
    <lib.Popover open>
      <lib.PopoverContent>C</lib.PopoverContent>
    </lib.Popover>,
  ],
  [
    "Menu",
    <lib.Menu items={[{ key: "a", label: "A" }]}>
      <button type="button">Menu</button>
    </lib.Menu>,
  ],
  [
    "ContextMenu",
    <lib.ContextMenu items={[{ key: "a", label: "A" }]}>
      <div>Area</div>
    </lib.ContextMenu>,
  ],
  ["ToastProvider", <lib.ToastProvider>x</lib.ToastProvider>],
  [
    "TooltipProvider",
    <lib.TooltipProvider>
      <lib.Tooltip content="Tip">
        <button type="button">T</button>
      </lib.Tooltip>
    </lib.TooltipProvider>,
  ],
  [
    "PageTabs",
    <lib.PageTabs ariaLabel="Pages" activeValue="a">
      <lib.PageTab value="a" label="A" />
    </lib.PageTabs>,
  ],
  [
    "PageTab",
    <lib.PageTabs ariaLabel="Pages" activeValue="a">
      <lib.PageTab value="a" label="A" />
    </lib.PageTabs>,
  ],
  [
    "Table",
    <lib.Table
      columns={[{ key: "name", header: "Name" }]}
      data={[{ name: "Ada" }]}
    />,
  ],
  [
    "DataTable",
    <lib.DataTable
      columns={[{ key: "name", header: "Name" }]}
      data={[{ name: "Ada" }]}
    />,
  ],
  [
    "TableRoot",
    <lib.TableRoot>
      <lib.TableHead>
        <lib.TableRow>
          <lib.TableHeader>H</lib.TableHeader>
        </lib.TableRow>
      </lib.TableHead>
      <lib.TableBody>
        <lib.TableRow>
          <lib.TableCell>C</lib.TableCell>
        </lib.TableRow>
      </lib.TableBody>
    </lib.TableRoot>,
  ],
  [
    "TableHead",
    <table>
      <lib.TableHead />
    </table>,
  ],
  [
    "TableBody",
    <table>
      <lib.TableBody />
    </table>,
  ],
  [
    "TableRow",
    <table>
      <tbody>
        <lib.TableRow />
      </tbody>
    </table>,
  ],
  [
    "TableHeader",
    <table>
      <thead>
        <tr>
          <lib.TableHeader>H</lib.TableHeader>
        </tr>
      </thead>
    </table>,
  ],
  [
    "TableCell",
    <table>
      <tbody>
        <tr>
          <lib.TableCell>C</lib.TableCell>
        </tr>
      </tbody>
    </table>,
  ],
  ["TableCellContent", <lib.TableCellContent primary="P" secondary="S" />],
  [
    "NavTree",
    <lib.NavTree
      sections={[{ id: "s", items: [{ id: "a", label: "A", href: "/a" }] }]}
    />,
  ],
  [
    "Tabs",
    <lib.Tabs defaultValue="a">
      <lib.TabList>
        <lib.Tab value="a">A</lib.Tab>
      </lib.TabList>
      <lib.TabPanel value="a">P</lib.TabPanel>
    </lib.Tabs>,
  ],
  [
    "TabList",
    <lib.Tabs defaultValue="a">
      <lib.TabList>
        <lib.Tab value="a">A</lib.Tab>
      </lib.TabList>
    </lib.Tabs>,
  ],
  [
    "Tab",
    <lib.Tabs defaultValue="a">
      <lib.TabList>
        <lib.Tab value="a">A</lib.Tab>
      </lib.TabList>
    </lib.Tabs>,
  ],
  [
    "TabPanel",
    <lib.Tabs defaultValue="a">
      <lib.TabPanel value="a">P</lib.TabPanel>
    </lib.Tabs>,
  ],
  ["HtmlPreview", <lib.HtmlPreview html="<p>Hi</p>" title="Preview" />],
  [
    "Steps",
    <lib.Steps
      items={[
        { value: "a", label: "A" },
        { value: "b", label: "B" },
      ]}
      value="a"
    />,
  ],
  [
    "Upload",
    <lib.Upload
      label="Files"
      value={[{ id: "1", name: "a.txt", status: "done" }]}
      onFilesSelected={noop}
    />,
  ],
];
