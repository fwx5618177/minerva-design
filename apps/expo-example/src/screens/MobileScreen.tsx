import { useState } from "react";
import {
  Cell,
  Collapse,
  CollapseItem,
  Grid,
  GridItem,
  PullRefresh,
  SearchBar,
  SwipeCell,
  TabBar,
  TabBarItem,
} from "minerva-design/native";
import { Paragraph, Screen, Section } from "../ui";
export function MobileScreen() {
  const [tab, setTab] = useState("home");
  const [result, setResult] = useState("");
  return (
    <Screen title="Mobile">
      <Section title="Search">
        <SearchBar placeholder="Search" onSearch={setResult} />
      </Section>
      <Section title="Grid">
        <Grid columnNum={2}>
          <GridItem text="Books" onPress={() => setResult("Books")} />
          <GridItem text="Authors" onPress={() => setResult("Authors")} />
        </Grid>
      </Section>
      <Section title="Swipe actions">
        <SwipeCell
          rightActions={[
            { text: "Delete", onPress: () => setResult("Deleted") },
          ]}
        >
          <Cell title="Swipe left" />
        </SwipeCell>
      </Section>
      <Section title="Collapse">
        <Collapse>
          <CollapseItem name="shipping" title="Shipping">
            <Paragraph>Delivery in 3–5 days.</Paragraph>
          </CollapseItem>
        </Collapse>
      </Section>
      <Section title="Pull to refresh">
        <PullRefresh
          onRefresh={async () => {
            setResult("Refreshed");
          }}
        >
          <Paragraph>Pull down to refresh</Paragraph>
        </PullRefresh>
      </Section>
      <Section title="Tab bar">
        <TabBar value={tab} onChange={setTab}>
          <TabBarItem value="home" label="Home" />
          <TabBarItem value="account" label="Account" />
        </TabBar>
      </Section>
      <Paragraph>{result || `Selected ${tab}`}</Paragraph>
    </Screen>
  );
}
