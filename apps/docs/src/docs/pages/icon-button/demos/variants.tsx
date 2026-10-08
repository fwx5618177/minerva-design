import { HStack, IconButton, VStack } from "minerva-design";
import { IoHeart } from "react-icons/io5";

const variants = ["ghost", "solid", "outline"] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {(["neutral", "primary", "danger"] as const).map((color) => (
        <HStack key={color} gap={2} wrap>
          {variants.map((variant) => (
            <IconButton
              key={variant}
              icon={<IoHeart />}
              color={color}
              variant={variant}
              label={`${color} ${variant}`}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
