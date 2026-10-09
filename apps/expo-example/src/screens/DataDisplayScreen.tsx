import {
  Avatar,
  Badge,
  Card,
  Cell,
  CellGroup,
  Tag,
} from "minerva-design/native";
import { Paragraph, Row, Screen, Section } from "../ui";
export function DataDisplayScreen() {
  return (
    <Screen title="Data display">
      <Section title="Avatar and badge">
        <Row>
          <Avatar name="Ada Lovelace" />
          <Badge content={3}>
            <Avatar name="Grace Hopper" />
          </Badge>
        </Row>
      </Section>
      <Section title="Tags">
        <Row>
          <Tag color="success">Complete</Tag>
          <Tag color="warning" variant="outline">
            Pending
          </Tag>
        </Row>
      </Section>
      <Section title="Card">
        <Card title="Order #58213" description="Placed today">
          <Paragraph>Two books ready for delivery.</Paragraph>
        </Card>
      </Section>
      <Section title="Cells">
        <CellGroup>
          <Cell title="Account" value="Ada" />
          <Cell title="Notifications" label="Order updates" value="Enabled" />
        </CellGroup>
      </Section>
    </Screen>
  );
}
