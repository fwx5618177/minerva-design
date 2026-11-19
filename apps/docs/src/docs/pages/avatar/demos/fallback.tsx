import { UserIcon } from "minerva-design/icons";
import { Avatar, AvatarGroup } from "minerva-design";

export default function FallbackDemo() {
  return (
    <>
      <Avatar name="Ada Lovelace" size="xsmall" />
      <Avatar name="张三" size={40} />
      <Avatar src="data:image/png;base64,broken" name="Grace Hopper" />
      <Avatar aria-label="Guest">
        <UserIcon size="1em" aria-hidden />
      </Avatar>
      <Avatar name="VIP" fallback="★" shape="rounded" size="xlarge" />
      <AvatarGroup max={2}>
        <Avatar name="Olivia" stacked />
        <Avatar name="James" stacked />
        <Avatar name="Sophia" stacked />
        <Avatar name="Lucas" stacked />
      </AvatarGroup>
    </>
  );
}
