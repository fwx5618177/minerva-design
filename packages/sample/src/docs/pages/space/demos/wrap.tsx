import { Space, Tag } from "@minerva/lib-core";

const tags = [
  "React",
  "TypeScript",
  "Vite",
  "SCSS",
  "Vitest",
  "Storybook",
  "Web Components",
  "Accessibility",
  "Theming",
  "i18n",
];

export default function WrapDemo() {
  return (
    <div style={{ maxWidth: 360 }}>
      <Space wrap size="small">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Space>
    </div>
  );
}
