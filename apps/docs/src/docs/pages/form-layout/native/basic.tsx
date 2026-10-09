import {
  FormLayout,
  FormControl,
  FormLabel,
  Input,
} from "minerva-design/native";
export default function Basic() {
  return (
    <FormLayout columns={{ base: 1, md: 2 }}>
      <FormControl>
        <FormLabel>First name</FormLabel>
        <Input />
      </FormControl>
      <FormControl>
        <FormLabel>Last name</FormLabel>
        <Input />
      </FormControl>
    </FormLayout>
  );
}
