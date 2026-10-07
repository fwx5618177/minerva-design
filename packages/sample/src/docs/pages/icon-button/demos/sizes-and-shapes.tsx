import { IconButton } from "@minerva/lib-core";
import { IoStar } from "react-icons/io5";

export default function SizesAndShapesDemo() {
  return (
    <>
      <IconButton icon={<IoStar />} size="small" ariaLabel="Small" />
      <IconButton icon={<IoStar />} size="medium" ariaLabel="Medium" />
      <IconButton icon={<IoStar />} size="large" ariaLabel="Large" />
      <IconButton
        icon={<IoStar />}
        shape="square"
        size="small"
        ariaLabel="Small square"
      />
      <IconButton icon={<IoStar />} shape="square" ariaLabel="Medium square" />
      <IconButton
        icon={<IoStar />}
        shape="square"
        size="large"
        ariaLabel="Large square"
      />
    </>
  );
}
