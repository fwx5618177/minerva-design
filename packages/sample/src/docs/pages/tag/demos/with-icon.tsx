import { Tag } from "@minerva/lib-core";
import { FaBug, FaCheck, FaClock } from "react-icons/fa";

export default function WithIconDemo() {
  return (
    <>
      <Tag icon={<FaCheck />} color="success">
        Done
      </Tag>
      <Tag icon={<FaClock />} color="warning">
        In progress
      </Tag>
      <Tag icon={<FaBug />} color="danger">
        Bug
      </Tag>
    </>
  );
}
