import { CodeBlock } from "minerva-design/native";

const payload = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);

export default function Basic() {
  return <CodeBlock language="json" showLanguage children={payload} />;
}
