import {
  Page,
  PageHeader,
  PageSection,
  StatCard,
  Toolbar,
  Button,
} from "minerva-design/native";
export default function Basic() {
  return (
    <Page>
      <PageHeader title="Workspace" description="Your project overview" />
      <PageSection title="Activity">
        <StatCard label="Projects" value={12} />
      </PageSection>
      <Toolbar>
        <Button>New project</Button>
      </Toolbar>
    </Page>
  );
}
