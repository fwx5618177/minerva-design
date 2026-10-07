import { Chip } from "@minerva/lib-core";

export default function StatesDemo() {
  return (
    <>
      <Chip label="Uploading" loading color="info" />
      <Chip label="Disabled" disabled onDelete={() => {}} />
      <Chip label="Disabled clickable" disabled clickable color="primary" />
    </>
  );
}
