import { Button } from "@minerva/lib-core";
import { IoAdd, IoSearch, IoTrash } from "react-icons/io5";

export default function WithIconDemo() {
  return (
    <>
      <Button variant="primary">
        <IoSearch aria-hidden /> Search
      </Button>
      <Button variant="success">
        <IoAdd aria-hidden /> Add
      </Button>
      <Button variant="error" ariaLabel="Delete item">
        <IoTrash aria-hidden />
      </Button>
    </>
  );
}
