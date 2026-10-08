import { Avatar, Tag } from "minerva-design";
import { LuCode } from "react-icons/lu";

export default function AvatarLoadingDemo() {
  return (
    <>
      <Tag avatar={<Avatar name="Mia Rossi" size="xsmall" />} shape="circle">
        Mia Rossi
      </Tag>
      <Tag icon={<LuCode />} color="info" variant="outline">
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
