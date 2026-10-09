import { DescriptionList } from "minerva-design/native";
export default function Basic() {
  return (
    <DescriptionList
      bordered
      striped
      items={[
        { key: "owner", label: "Owner", value: "Ada" },
        { key: "status", label: "Status", value: "Active" },
      ]}
    />
  );
}
