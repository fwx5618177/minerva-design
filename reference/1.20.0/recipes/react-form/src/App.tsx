import { useState } from "react";
import {
  Button,
  ConfigProvider,
  FormField,
  Input,
  Switch,
  ToastProvider,
  VStack,
  toast,
} from "minerva-design";

export default function App() {
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [saved, setSaved] = useState("");
  return (
    <ConfigProvider theme="light">
      <ToastProvider>
        <VStack gap={4} align="start">
          <FormField label="Project name" required>
            <Input
              name="project"
              value={name}
              onChange={(event) => setName(event.target.value)}
              clearable
            />
          </FormField>
          <Switch
            label="Newsletter"
            checked={subscribed}
            onChange={setSubscribed}
          />
          <Button
            disabled={!name.trim()}
            onClick={() => {
              setSaved(`${name}${subscribed ? " · subscribed" : ""}`);
              toast.success("Project saved");
            }}
          >
            Save project
          </Button>
          <output aria-live="polite">{saved || "No project saved"}</output>
        </VStack>
      </ToastProvider>
    </ConfigProvider>
  );
}
