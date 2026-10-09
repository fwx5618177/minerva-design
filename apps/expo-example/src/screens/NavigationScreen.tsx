import { useState } from "react";
import { Pagination, Steps, Tabs } from "minerva-design/native";
import { Paragraph, Screen, Section } from "../ui";
export function NavigationScreen() {
  const [tab, setTab] = useState("current");
  const [page, setPage] = useState(1);
  const [step, setStep] = useState("address");
  return (
    <Screen title="Navigation">
      <Section title="Tabs">
        <Tabs
          value={tab}
          onChange={setTab}
          listLabel="Orders"
          items={[
            { value: "current", label: "Current" },
            { value: "history", label: "History" },
            { value: "disabled", label: "Unavailable", disabled: true },
          ]}
        />
        <Paragraph>
          {tab === "current" ? "Current orders" : "Past orders"}
        </Paragraph>
      </Section>
      <Section title="Steps">
        <Steps
          value={step}
          onChange={setStep}
          items={[
            { value: "address", title: "Address" },
            { value: "payment", title: "Payment" },
            { value: "done", title: "Done" },
          ]}
        />
      </Section>
      <Section title="Pagination">
        <Pagination current={page} onChange={setPage} total={100} />
        <Paragraph>Page {page}</Paragraph>
      </Section>
    </Screen>
  );
}
