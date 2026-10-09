import { Cascader } from "minerva-design/native";
export default function Basic() {
  return (
    <Cascader
      label="Region"
      showSearch
      allowClear
      options={[
        {
          value: "cn",
          label: "China",
          children: [
            { value: "sh", label: "Shanghai" },
            { value: "bj", label: "Beijing" },
          ],
        },
        {
          value: "fr",
          label: "France",
          children: [{ value: "paris", label: "Paris" }],
        },
      ]}
    />
  );
}
