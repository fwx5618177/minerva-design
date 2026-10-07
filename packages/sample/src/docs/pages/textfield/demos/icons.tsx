import { TextField } from "@minerva/lib-core";
import { IoMailOutline, IoSearch } from "react-icons/io5";

export default function IconsDemo() {
  return (
    <>
      <TextField name="icons-search" label="Search" icon={<IoSearch />} />
      <TextField
        name="icons-email"
        label="Email"
        type="email"
        icon={<IoMailOutline />}
        iconPosition="right"
      />
    </>
  );
}
