import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "minerva-design";

export default function BasicDemo() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete record</Button>
      {deleted && <p role="status">Record deleted</p>}
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Delete this record?"
        description="The record and its history are removed permanently."
        size="small"
      >
        <ModalBody>Other team members lose access immediately.</ModalBody>
        <ModalFooter>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setDeleted(true);
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
