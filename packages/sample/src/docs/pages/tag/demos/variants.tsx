import { HStack, Tag, VStack } from "@minerva/lib-core";

const variants = ["subtle", "outline", "solid"] as const;
const colors = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {variants.map((variant) => (
        <HStack key={variant} gap={2} wrap>
          {colors.map((color) => (
            <Tag key={color} variant={variant} color={color}>
              {variant}
            </Tag>
          ))}
        </HStack>
      ))}
      <HStack gap={2} wrap>
        <Tag elevation color="success">
          Elevation
        </Tag>
        <Tag variant="outline" elevation>
          Outline + elevation
        </Tag>
      </HStack>
    </VStack>
  );
}
