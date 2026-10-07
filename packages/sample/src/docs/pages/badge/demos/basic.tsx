import { Badge } from "@minerva/lib-core";
import { FaBell, FaEnvelope } from "react-icons/fa";

export default function BasicDemo() {
  return (
    <>
      <Badge content={5} ariaLabel="5 unread notifications">
        <FaBell size={24} aria-label="Notifications" />
      </Badge>
      <Badge content="99+" ariaLabel="More than 99 messages">
        <FaEnvelope size={24} aria-label="Messages" />
      </Badge>
      <span>
        Inbox <Badge content={12} variant="info" ariaLabel="12 unread" /> and
        changelog <Badge variant="success">New</Badge>
      </span>
    </>
  );
}
