import { IconButton } from "@minerva/lib-core";
import { IoAdd, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";

export default function BasicDemo() {
  return (
    <>
      <IconButton
        icon={<IoAdd />}
        aria-label="Add"
        onClick={() => alert("Add")}
      />
      <IconButton icon={<IoSettingsOutline />} aria-label="Settings" />
      <IconButton icon={<IoTrashOutline />} aria-label="Delete" />
    </>
  );
}
