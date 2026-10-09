import { Text } from "react-native";
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "minerva-design/native";
export default function Basic() {
  return (
    <DrawerRoot>
      <DrawerTrigger>Open details</DrawerTrigger>
      <DrawerContent title="Details">
        <DrawerHeader>
          <Text>Project details</Text>
        </DrawerHeader>
        <DrawerBody>
          <Text>Native overlay content.</Text>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}
