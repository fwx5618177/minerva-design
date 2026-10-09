import { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  NumberInput,
  RadioGroup,
  Rating,
  SearchBar,
  Select,
  Switch,
  Textarea,
} from "minerva-design/native";
import { Paragraph, Screen, Section } from "../ui";

export function FormsScreen() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState("");
  const [notifications, setNotifications] = useState(true);
  return (
    <Screen title="Forms">
      <Section
        title="Profile"
        description="Controlled fields with disabled and validation states."
      >
        <Input
          accessibilityLabel="Name"
          value={name}
          onChange={setName}
          clearable
          placeholder="Your name"
        />
        <Input
          accessibilityLabel="Password"
          type="password"
          placeholder="Password"
        />
        <Input
          accessibilityLabel="Disabled input"
          value="Unavailable"
          disabled
        />
        <Textarea accessibilityLabel="Biography" placeholder="About you" />
        <NumberInput
          accessibilityLabel="Quantity"
          defaultValue={1}
          min={1}
          max={10}
        />
        <Checkbox defaultChecked>Accept terms</Checkbox>
        <Switch
          checked={notifications}
          onChange={setNotifications}
          label="Notifications"
        />
        <RadioGroup
          label="Delivery"
          options={[
            { value: "standard", label: "Standard" },
            { value: "express", label: "Express" },
          ]}
          defaultValue="standard"
        />
        <Select
          label="Country"
          searchable
          options={[
            { value: "cn", label: "China" },
            { value: "fr", label: "France" },
            { value: "unavailable", label: "Unavailable", disabled: true },
          ]}
        />
        <Rating defaultValue={6} accessibilityLabel="Score" />
        <Button onPress={() => setSaved(name)}>Save profile</Button>
        {saved ? <Paragraph>Saved {saved}</Paragraph> : null}
      </Section>
      <Section title="Search">
        <SearchBar placeholder="Search components" />
      </Section>
    </Screen>
  );
}
