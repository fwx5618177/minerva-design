import { Text } from "react-native";
import { Stack, HStack, VStack, Button } from "minerva-design/native";
export default function Basic() {
  return (
    <VStack gap={4}>
      <HStack gap={2} wrap>
        <Button>Save</Button>
        <Button variant="outline">Cancel</Button>
      </HStack>
      <Stack gap={2} separator="·">
        <Text>Profile</Text>
        <Text>Preferences</Text>
      </Stack>
    </VStack>
  );
}
