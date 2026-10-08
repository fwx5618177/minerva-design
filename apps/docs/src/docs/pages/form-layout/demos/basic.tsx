import { useState } from "react";
import {
  Alert,
  Button,
  FormField,
  FormLayout,
  GridItem,
  Input,
  Textarea,
} from "minerva-design";

export default function BasicDemo() {
  const [saved, setSaved] = useState<string | null>(null);
  return (
    <FormLayout
      columns={{ base: 1, sm: 2 }}
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(
          JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
        );
      }}
    >
      <GridItem fullWidth asChild>
        <FormField label="Title">
          <Input name="title" defaultValue="Draft" required />
        </FormField>
      </GridItem>
      <FormField label="Language">
        <Input name="language" />
      </FormField>
      <FormField label="Category">
        <Input name="category" />
      </FormField>
      <GridItem fullWidth asChild>
        <FormField label="Summary">
          <Textarea name="summary" rows={3} />
        </FormField>
      </GridItem>
      <GridItem fullWidth>
        <Button type="submit">Save</Button>
      </GridItem>
      {saved && (
        <GridItem fullWidth>
          <Alert color="success" title="Saved">
            <code>{saved}</code>
          </Alert>
        </GridItem>
      )}
    </FormLayout>
  );
}
