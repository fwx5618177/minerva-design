import { IconButton } from "@minerva/lib-core";
import { IoAdd, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";

export default function BasicDemo() {
  return (
    <>
      <IconButton
        icon={<IoAdd />}
        ariaLabel="Add"
        onClick={() => alert("Add")}
      />
      <IconButton icon={<IoSettingsOutline />} ariaLabel="Settings" />
      <IconButton icon={<IoTrashOutline />} ariaLabel="Delete" />
    </>
  );
}
