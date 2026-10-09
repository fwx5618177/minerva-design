import { Text } from "react-native";
import { Box } from "minerva-design/native";
export default function Basic() {
  return (
    <Box p={4} bg="bg.subtle" rounded="lg" boxShadow="sm">
      <Text>A padded native surface using shared design tokens.</Text>
    </Box>
  );
}
