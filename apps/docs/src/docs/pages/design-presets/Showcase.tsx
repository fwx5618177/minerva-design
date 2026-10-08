import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HStack,
  Input,
  Select,
  SelectItem,
  Switch,
  Tag,
  VStack,
} from "minerva-design";

/** The same screen, rendered under every design */
export function Showcase() {
  return (
    <Card style={{ maxWidth: 520, width: "100%" }}>
      <CardHeader>
        <CardTitle>Weekly digest</CardTitle>
      </CardHeader>
      <CardContent>
        <VStack gap={3}>
          <p style={{ margin: 0, lineHeight: "var(--line-height-base)" }}>
            A restrained, reading-oriented look keeps long texts comfortable; a
            compact one fits more data on dense screens.
          </p>
          <HStack gap={2} wrap>
            <Tag color="primary">Essay</Tag>
            <Tag color="success">Published</Tag>
          </HStack>
          <Input
            name="design-title"
            aria-label="Title"
            defaultValue="On craft"
          />
          <Select aria-label="Section" defaultValue="essays">
            <SelectItem value="essays">Essays</SelectItem>
            <SelectItem value="notes">Notes</SelectItem>
          </Select>
          <Switch label="Send as newsletter" defaultChecked />
          <Alert color="info" title="Scheduled for Monday" />
          <HStack gap={2}>
            <Button>Publish</Button>
            <Button color="neutral" variant="outline">
              Save draft
            </Button>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  );
}
