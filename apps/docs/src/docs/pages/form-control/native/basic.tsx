import { View } from "react-native";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
} from "minerva-design/native";
export default function Basic() {
  return (
    <View style={{ gap: 12 }}>
      <FormControl required>
        <FormLabel>Email</FormLabel>
        <Input placeholder="you@example.com" />
        <FormHelperText>Used for order updates.</FormHelperText>
      </FormControl>
      <FormControl invalid>
        <FormLabel>Reference</FormLabel>
        <Input />
        <FormErrorMessage>A reference is required.</FormErrorMessage>
      </FormControl>
    </View>
  );
}
