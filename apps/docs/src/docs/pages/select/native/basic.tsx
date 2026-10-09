import { useState } from "react";
import { Select } from "minerva-design/native";
export default function Basic() {
  const [language, setLanguage] = useState("en");
  return (
    <Select
      accessibilityLabel="Language"
      value={language}
      onChange={setLanguage}
      options={[
        { value: "en", label: "English" },
        { value: "zh", label: "Chinese" },
        { value: "fr", label: "French" },
      ]}
    />
  );
}
