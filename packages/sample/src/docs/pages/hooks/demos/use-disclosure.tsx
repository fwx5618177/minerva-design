import {
  Alert,
  Button,
  Space,
  Tag,
  cn,
  useDisclosure,
} from "@minerva/lib-core";

// useDisclosure keeps an open / closed state (uncontrolled here; pass isOpen
// and onChange to control it). cn joins class names and skips falsy values.
export default function UseDisclosureDemo() {
  const panel = useDisclosure({ defaultIsOpen: true });

  return (
    <Space direction="vertical" size="medium" style={{ width: "100%" }}>
      <Space wrap align="center">
        <Button size="small" variant="primary" onClick={panel.onToggle}>
          Toggle
        </Button>
        <Button size="small" variant="secondary" onClick={panel.onOpen}>
          Open
        </Button>
        <Button size="small" variant="secondary" onClick={panel.onClose}>
          Close
        </Button>
        isOpen:{" "}
        <Tag variant={panel.isOpen ? "success" : "info"}>
          {String(panel.isOpen)}
        </Tag>
      </Space>
      {panel.isOpen && (
        <Alert
          variant="info"
          title="Details"
          className={cn("disclosure-panel", panel.isOpen && "is-open")}
        >
          className = &quot;{cn("disclosure-panel", panel.isOpen && "is-open")}
          &quot;
        </Alert>
      )}
    </Space>
  );
}
