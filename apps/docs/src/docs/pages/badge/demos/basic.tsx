import { BellIcon, MailIcon } from "minerva-design/icons";
import { Badge } from "minerva-design";

export default function BasicDemo() {
  return (
    <>
      <Badge content={5} aria-label="5 unread notifications">
        <BellIcon size={24} aria-label="Notifications" />
      </Badge>
      <Badge content="99+" aria-label="More than 99 messages">
        <MailIcon size={24} aria-label="Messages" />
      </Badge>
      <span>
        Inbox <Badge content={12} color="info" aria-label="12 unread" /> and
        changelog <Badge color="success">New</Badge>
      </span>
    </>
  );
}
