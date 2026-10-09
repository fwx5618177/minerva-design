import { Text } from "react-native";
import { Avatar, Badge, Cell, CellGroup, Tag } from "minerva-design/native";

export default function RichRows() {
  return (
    <CellGroup title="Messages">
      <Cell
        size="large"
        icon={
          <Avatar
            size="small"
            name="Sofia Martinez"
            src="https://randomuser.me/api/portraits/women/44.jpg"
          />
        }
        title="Sofia Martinez"
        label="Is the jacket still available in M?"
        rightIcon={<Badge content={3} />}
        clickable
      />
      <Cell
        size="large"
        icon={<Avatar size="small" name="Pizza Roma" />}
        title="Pizza Roma"
        label="Your order is out for delivery, arriving in 10 minutes."
        center={false}
        value="12:40"
      />
      <Cell
        icon={<Text style={{ fontSize: 18 }}>🎁</Text>}
        title="Gift cards"
        isLink
      >
        <Tag color="danger" size="small">
          New
        </Tag>
      </Cell>
      <Cell title="Archived chats" disabled clickable border={false} />
    </CellGroup>
  );
}
