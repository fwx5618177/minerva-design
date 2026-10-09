import { useState } from "react";
import {
  ActionSheet,
  Button,
  Dialog,
  Popup,
  Select,
} from "minerva-design/native";
import { Paragraph, Screen, Section } from "../ui";
export function OverlaysScreen() {
  const [open, setOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [popup, setPopup] = useState(false);
  const [result, setResult] = useState("");
  return (
    <Screen title="Overlays">
      <Section title="Dialog">
        <Button onPress={() => setOpen(true)}>Show dialog</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Notifications"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onConfirm={() => setResult("Confirmed")}
        >
          <Paragraph>Get order updates on this device.</Paragraph>
        </Dialog>
        {result ? <Paragraph>{result}</Paragraph> : null}
      </Section>
      <Section title="Action sheet">
        <Button onPress={() => setSheet(true)}>Choose action</Button>
        <ActionSheet
          open={sheet}
          onOpenChange={setSheet}
          title="Actions"
          actions={[{ name: "Save" }, { name: "Delete", color: "danger" }]}
          onSelect={(action) => setResult(String(action.name))}
        />
      </Section>
      <Section title="Popup">
        <Button onPress={() => setPopup(true)}>Show popup</Button>
        <Popup open={popup} onOpenChange={setPopup}>
          <Paragraph>Popup content</Paragraph>
          <Button onPress={() => setPopup(false)}>Close popup</Button>
        </Popup>
      </Section>
      <Section title="Multiple selection">
        <Select
          label="Topics"
          multiple
          searchable
          options={[
            { value: "fiction", label: "Fiction" },
            { value: "science", label: "Science" },
          ]}
        />
      </Section>
    </Screen>
  );
}
