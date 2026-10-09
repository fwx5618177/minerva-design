import { useState } from "react";
import { Button, Input, Dialog } from "minerva-design/native";
export default function Form() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Quarterly report");
  const [draft, setDraft] = useState(name);
  return (
    <>
      <Button
        onPress={() => {
          setDraft(name);
          setOpen(true);
        }}
      >
        {`Rename “${name}”`}
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Rename document"
        footer={
          <Button
            onPress={() => {
              setName(draft);
              setOpen(false);
            }}
          >
            Save
          </Button>
        }
      >
        <Input label="Name" value={draft} onChange={setDraft} />
      </Dialog>
    </>
  );
}
