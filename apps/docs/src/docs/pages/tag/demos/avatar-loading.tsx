import { CodeIcon } from "minerva-design/icons";
import { Avatar, Tag } from "minerva-design";

export default function AvatarLoadingDemo() {
  return (
    <>
      <Tag avatar={<Avatar name="Mia Rossi" size="xsmall" />} shape="circle">
        Mia Rossi
      </Tag>
      <Tag icon={<CodeIcon size="1em" />} color="info" variant="outline">
        Frontend
      </Tag>
      <Tag loading color="info">
        Uploading
      </Tag>
      <Tag loading closable>
        Saving
      </Tag>
    </>
  );
}
