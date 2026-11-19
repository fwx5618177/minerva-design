import { StarIcon } from "minerva-design/icons";
import { IconButton } from "minerva-design";

export default function SizesAndShapesDemo() {
  return (
    <>
      <IconButton
        icon={<StarIcon size="1em" />}
        size="small"
        aria-label="Small"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        size="medium"
        aria-label="Medium"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        size="large"
        aria-label="Large"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        shape="square"
        size="small"
        aria-label="Small square"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        shape="square"
        aria-label="Medium square"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        shape="square"
        size="large"
        aria-label="Large square"
      />
    </>
  );
}
