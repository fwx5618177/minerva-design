// General: Button, IconButton, Divider.
import { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  useTheme,
  useToast,
} from "minerva-design/native";
import { Glyph, Paragraph, Row, Screen, Section } from "../ui";

function CheckoutButton() {
  const toast = useToast();
  const [paying, setPaying] = useState(false);
  return (
    <Button
      fullWidth
      size="large"
      loading={paying}
      loadingText="Processing payment..."
      onPress={() => {
        setPaying(true);
        setTimeout(() => {
          setPaying(false);
          toast.success("Order placed", {
            description: "Your sneakers ship tomorrow.",
          });
        }, 1500);
      }}
    >
      Pay $129.00
    </Button>
  );
}

function PostActions() {
  const toast = useToast();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(true);
  return (
    <Row>
      <IconButton
        label="Like"
        pressed={liked}
        onPressedChange={setLiked}
        color={liked ? "danger" : "neutral"}
        icon={(color, size) => (
          <Glyph color={color} size={size}>
            {liked ? "♥" : "♡"}
          </Glyph>
        )}
      />
      <IconButton
        label="Comment"
        icon={(color, size) => (
          <Glyph color={color} size={size}>
            ✉
          </Glyph>
        )}
        onPress={() => toast.info("Comments are coming soon")}
      />
      <IconButton
        label="Bookmark"
        pressed={saved}
        onPressedChange={setSaved}
        color={saved ? "warning" : "neutral"}
        icon={(color, size) => (
          <Glyph color={color} size={size}>
            {saved ? "★" : "☆"}
          </Glyph>
        )}
      />
      <IconButton
        label="Share"
        variant="outline"
        shape="square"
        icon={(color, size) => (
          <Glyph color={color} size={size}>
            ⇪
          </Glyph>
        )}
        onPress={() => toast("Link copied")}
      />
      <IconButton
        label="Add to cart"
        variant="solid"
        color="primary"
        icon={(color, size) => (
          <Glyph color={color} size={size}>
            +
          </Glyph>
        )}
      />
      <IconButton label="Syncing" variant="outline" loading icon="⟳" />
    </Row>
  );
}

export function GeneralScreen() {
  const { colors, tokens } = useTheme();
  return (
    <Screen title="General">
      <Section title="Button" description="Variants of a primary action.">
        <Row>
          <Button>Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </Row>
        <Row>
          <Button color="success">Confirm</Button>
          <Button color="warning" variant="outline">
            Snooze
          </Button>
          <Button color="danger" variant="ghost">
            Delete
          </Button>
          <Button color="neutral" variant="outline">
            Neutral
          </Button>
        </Row>
        <Row>
          <Button size="xsmall">XS</Button>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </Row>
        <Row>
          <Button
            startIcon={
              <Glyph size={14} color={colors["primary-color"]}>
                ←
              </Glyph>
            }
            variant="outline"
            shape="circle"
          >
            Back
          </Button>
          <Button
            endIcon={
              <Glyph size={14} color={colors["text-inverse-color"]}>
                →
              </Glyph>
            }
            shape="rounded"
          >
            Continue
          </Button>
          <Button disabled>Sold out</Button>
          <Button loading>Saving</Button>
        </Row>
        <CheckoutButton />
      </Section>

      <Section
        title="IconButton"
        description="Icon-only actions of a social post; Like and Bookmark are toggles."
      >
        <PostActions />
      </Section>

      <Section title="Divider" description="Separate content groups.">
        <Paragraph>Order summary</Paragraph>
        <Divider />
        <Divider textAlign="left">Shipping</Divider>
        <Divider variant="dashed">or continue with</Divider>
        <Divider variant="dotted" textAlign="right">
          End of list
        </Divider>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: tokens.space["8"],
          }}
        >
          <Paragraph>Help</Paragraph>
          <Divider orientation="vertical" spacing={tokens.space["3"]} />
          <Paragraph>Privacy</Paragraph>
          <Divider orientation="vertical" spacing={tokens.space["3"]} />
          <Paragraph>Terms</Paragraph>
        </View>
      </Section>
    </Screen>
  );
}
