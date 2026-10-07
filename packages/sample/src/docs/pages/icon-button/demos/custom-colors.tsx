import { IconButton } from "@minerva/lib-core";
import { IoFlash, IoLeaf, IoWater } from "react-icons/io5";

export default function CustomColorsDemo() {
  return (
    <>
      <IconButton
        icon={<IoFlash />}
        color="#f59e0b"
        bgColor="rgba(245, 158, 11, 0.12)"
        hoverColor="rgba(245, 158, 11, 0.24)"
        ariaLabel="Energy"
      />
      <IconButton
        icon={<IoLeaf />}
        color="#ffffff"
        bgColor="#16a34a"
        ariaLabel="Eco mode"
      />
      <IconButton
        icon={<IoWater />}
        color="#0ea5e9"
        activeColor="#0369a1"
        active
        ariaLabel="Water"
      />
    </>
  );
}
