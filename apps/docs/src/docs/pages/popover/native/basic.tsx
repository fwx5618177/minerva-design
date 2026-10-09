import { Text } from "react-native";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from "minerva-design/native";
export default function Basic() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Details</Button>
      </PopoverTrigger>
      <PopoverContent title="Account">
        <Text>Signed in as Ada.</Text>
        <PopoverClose asChild>
          <Button>Done</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
