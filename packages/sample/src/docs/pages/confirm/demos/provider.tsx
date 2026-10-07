import { Button, ConfirmProvider, useConfirm } from "@minerva/lib-core";

function PublishButton() {
  const ask = useConfirm();
  return (
    <Button
      onClick={async () => {
        if (await ask({ title: "Publish chapter?", confirmLabel: "Publish" })) {
          alert("Published");
        }
      }}
    >
      Publish
    </Button>
  );
}

export default function ProviderDemo() {
  return (
    <ConfirmProvider>
      <PublishButton />
    </ConfirmProvider>
  );
}
