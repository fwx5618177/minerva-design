import { BugIcon, CheckIcon, ClockIcon } from "minerva-design/icons";
import { Tag } from "minerva-design";

export default function WithIconDemo() {
  return (
    <>
      <Tag icon={<CheckIcon size="1em" />} color="success">
        Done
      </Tag>
      <Tag icon={<ClockIcon size="1em" />} color="warning">
        In progress
      </Tag>
      <Tag icon={<BugIcon size="1em" />} color="danger">
        Bug
      </Tag>
    </>
  );
}
