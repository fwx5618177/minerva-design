import { Button } from "@minerva/lib-core";

export default function AppearanceDemo() {
  return (
    <>
      <Button appearance="solid">Solid</Button>
      <Button appearance="outline" variant="neutral">
        Outline
      </Button>
      <Button appearance="ghost" variant="danger">
        Ghost
      </Button>
      <Button appearance="link" variant="accent">
        Link
      </Button>
      <Button appearance="solid" size="xsmall">
        Extra small
      </Button>
    </>
  );
}
