import { Checkbox } from "@minerva/lib-core";
import { IoHeart } from "react-icons/io5";

export default function CustomStyleDemo() {
  return (
    <>
      <Checkbox
        label="Custom colors"
        defaultChecked
        boxColor="#7c3aed"
        boxBorderColor="#7c3aed"
        checkmarkColor="#fde68a"
      />
      <Checkbox
        label="Custom icon"
        defaultChecked
        icon={<IoHeart color="#e11d48" />}
      />
    </>
  );
}
