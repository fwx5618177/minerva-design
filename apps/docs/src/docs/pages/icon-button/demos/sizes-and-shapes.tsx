import { IconButton } from "minerva-design";
import { IoStar } from "react-icons/io5";

export default function SizesAndShapesDemo() {
  return (
    <>
      <IconButton icon={<IoStar />} size="small" aria-label="Small" />
      <IconButton icon={<IoStar />} size="medium" aria-label="Medium" />
      <IconButton icon={<IoStar />} size="large" aria-label="Large" />
      <IconButton
        icon={<IoStar />}
        shape="square"
        size="small"
        aria-label="Small square"
      />
      <IconButton icon={<IoStar />} shape="square" aria-label="Medium square" />
      <IconButton
        icon={<IoStar />}
        shape="square"
        size="large"
        aria-label="Large square"
      />
    </>
  );
}
