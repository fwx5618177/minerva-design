import { useState } from "react";
import {
  Button,
  Input,
  FormField,
  Modal,
  ModalBody,
  ModalFooter,
} from "minerva-design";

export default function FormDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Quarterly report");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Rename “{name}”</Button>
      <Modal open={open} onOpenChange={setOpen} title="Rename document">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setName(new FormData(event.currentTarget).get("name") as string);
            setOpen(false);
          }}
        >
          <ModalBody>
            <FormField label="Name">
              <Input name="name" defaultValue={name} />
            </FormField>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
