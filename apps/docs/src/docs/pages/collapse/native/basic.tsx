import { useState } from "react";
import { Text } from "react-native";
import { Collapse, CollapseItem, useTheme } from "minerva-design/native";

export default function Basic() {
  const { colors } = useTheme();
  const [open, setOpen] = useState<string | string[]>(["shipping"]);
  const body = { color: colors["text-secondary-color"] };
  return (
    <>
      <Collapse value={open} onChange={setOpen}>
        <CollapseItem
          name="shipping"
          title="Shipping"
          value="Free"
          icon={<Text>🚚</Text>}
        >
          <Text style={body}>Arrives in 2–4 business days with tracking.</Text>
        </CollapseItem>
        <CollapseItem
          name="returns"
          title="Returns"
          label="30-day free returns"
          icon={<Text>↩️</Text>}
        >
          <Text style={body}>
            Drop the parcel at any pickup point for a full refund.
          </Text>
        </CollapseItem>
        <CollapseItem
          name="warranty"
          title="Warranty"
          value="Not included"
          icon={<Text>🛡️</Text>}
          disabled
        >
          <Text style={body}>This item has no extended warranty.</Text>
        </CollapseItem>
      </Collapse>
      <Text style={[body, { marginTop: 12 }]}>
        Expanded: {[open].flat().join(", ") || "none"}
      </Text>
    </>
  );
}
