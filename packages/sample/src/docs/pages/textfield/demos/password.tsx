import { TextField } from "@minerva/lib-core";
import { IoEye } from "react-icons/io5";

export default function PasswordDemo() {
  return (
    <TextField
      name="password"
      label="Password"
      type="password"
      icon={<IoEye />}
      iconPosition="right"
    />
  );
}
