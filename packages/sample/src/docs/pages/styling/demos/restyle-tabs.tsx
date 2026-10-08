import { Tab, TabList, TabPanel, Tabs, VStack } from "@minerva/lib-core";
import "@minerva/lib-web-components";

const css = `
.underline-tabs [data-minerva="tabs"][data-part="list"],
.underline-tabs minerva-tabs::part(list) {
  gap: 4px;
  border-bottom: 1px solid var(--border-color);
}
.underline-tabs [data-minerva="tab"][data-part="root"],
.underline-tabs minerva-tab::part(root) {
  border-radius: 0;
  border-bottom: 2px solid transparent;
  font-weight: 500;
}
.underline-tabs [data-minerva="tab"][data-state="active"],
.underline-tabs minerva-tab:state(active)::part(root) {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}
.underline-tabs [data-minerva="tab"][data-disabled],
.underline-tabs minerva-tab:state(disabled)::part(root) {
  opacity: 0.4;
}
`;

export default function RestyleTabs() {
  return (
    <VStack className="underline-tabs" gap={24}>
      <style>{css}</style>
      <Tabs defaultValue="overview" variant="soft">
        <TabList aria-label="React tabs">
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="archive" disabled>
            Archive
          </Tab>
        </TabList>
        <TabPanel value="overview">React: data-* hooks</TabPanel>
        <TabPanel value="activity">Activity</TabPanel>
        <TabPanel value="archive">Archive</TabPanel>
      </Tabs>
      <minerva-tabs value="overview" variant="soft" label="Web Component tabs">
        <minerva-tab value="overview">Overview</minerva-tab>
        <minerva-tab value="activity">Activity</minerva-tab>
        <minerva-tab value="archive" disabled>
          Archive
        </minerva-tab>
        <minerva-tab-panel value="overview">
          Web Components: ::part() and :state()
        </minerva-tab-panel>
        <minerva-tab-panel value="activity">Activity</minerva-tab-panel>
        <minerva-tab-panel value="archive">Archive</minerva-tab-panel>
      </minerva-tabs>
    </VStack>
  );
}
