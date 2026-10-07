import { Tag } from "@minerva/lib-core";
import { FaBug, FaCheck, FaClock } from "react-icons/fa";

export default function WithIconDemo() {
  return (
    <>
      <Tag icon={<FaCheck />} variant="success">
        Done
      </Tag>
      <Tag icon={<FaClock />} variant="warning">
        In progress
      </Tag>
      <Tag icon={<FaBug />} variant="error">
        Bug
      </Tag>
    </>
  );
}
