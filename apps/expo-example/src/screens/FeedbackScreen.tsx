// Feedback: Alert, Toast, Progress, Loading / Spinner, Skeleton, Empty.
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Alert,
  Button,
  Empty,
  Loading,
  Progress,
  Skeleton,
  Spinner,
  Switch,
  useTheme,
  useToast,
} from "minerva-design/native";
import { Paragraph, Row, Screen, Section } from "../ui";

function Alerts() {
  const [showPromo, setShowPromo] = useState(true);
  return (
    <>
      <Alert color="info" title="Delivery update">
        Your parcel arrives today between 2 and 4 pm.
      </Alert>
      <Alert color="success" variant="outline" title="Payment received" />
      <Alert
        color="warning"
        title="Low storage"
        action={
          <Button size="xsmall" variant="outline" color="warning">
            Manage
          </Button>
        }
      >
        Only 512 MB left; photos will stop backing up.
      </Alert>
      <Alert color="danger" variant="solid" title="Card declined">
        Check your card details or use another payment method.
      </Alert>
      <Alert
        color="info"
        title="What's new in 2.0"
        collapsible
        defaultExpanded={false}
      >
        Dark mode everywhere, faster sync, and a brand new search.
      </Alert>
      {showPromo ? (
        <Alert
          color="success"
          variant="subtle"
          banner
          closable
          onClose={() => setShowPromo(false)}
          title="Free shipping on orders over $50 this weekend"
        />
      ) : (
        <Button size="small" variant="link" onPress={() => setShowPromo(true)}>
          Show the promo banner again
        </Button>
      )}
    </>
  );
}

function Toasts() {
  const toast = useToast();
  return (
    <Row>
      <Button size="small" onPress={() => toast("Draft saved")}>
        Default
      </Button>
      <Button
        size="small"
        color="success"
        onPress={() =>
          toast.success("Profile updated", {
            description: "Your changes are live.",
          })
        }
      >
        Success
      </Button>
      <Button
        size="small"
        color="warning"
        onPress={() => toast.warning("You are offline")}
      >
        Warning
      </Button>
      <Button
        size="small"
        color="danger"
        onPress={() =>
          toast.danger("Message deleted", {
            action: { label: "Undo", onClick: () => toast.info("Restored") },
          })
        }
      >
        With action
      </Button>
      <Button
        size="small"
        variant="outline"
        onPress={() => {
          void toast.promise(
            new Promise<number>((resolve) =>
              setTimeout(() => resolve(3), 1500),
            ),
            {
              loading: "Uploading photos...",
              success: (n) => `${n} photos uploaded`,
              error: "Upload failed",
            },
          );
        }}
      >
        Promise
      </Button>
      <Button size="small" variant="ghost" onPress={() => toast.dismissAll()}>
        Dismiss all
      </Button>
    </Row>
  );
}

function DownloadProgress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 5)), 400);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <Progress value={value} showValue label="Downloading podcast" />
      <Progress value={72} color="success" size="small" label="Storage" />
      <Progress indeterminate label="Syncing" />
      <Row>
        <Progress variant="circle" value={value} showValue label="Upload" />
        <Progress
          variant="circle"
          value={45}
          color="warning"
          size="small"
          format={(v) => `${v}%`}
          showValue
          label="Battery"
        />
        <Progress variant="circle" value={100} color="success" showValue />
      </Row>
    </>
  );
}

function FeedSkeleton() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Switch
        checked={loading}
        onChange={setLoading}
        label="Loading state"
        size="small"
      />
      <Skeleton loading={loading} avatar title paragraph lines={3}>
        <Paragraph>
          Ada Lovelace shared a photo: &quot;Sunset over the bay&quot;. 128
          likes, 14 comments.
        </Paragraph>
      </Skeleton>
      <Row>
        <Skeleton variant="circular" size={40} />
        <Skeleton variant="rounded" width={120} height={40} />
        <Skeleton variant="button" animation="pulse" />
        <Skeleton variant="image" width={80} height={60} animation={false} />
      </Row>
    </>
  );
}

export function FeedbackScreen() {
  const { colors, tokens } = useTheme();
  const toast = useToast();
  return (
    <Screen title="Feedback">
      <Section title="Alert" description="Inline messages about the page.">
        <Alerts />
      </Section>
      <Section
        title="Toast"
        description="Transient notifications from useToast(), shown by ToastProvider."
      >
        <Toasts />
      </Section>
      <Section
        title="Progress"
        description="Line and circle, determinate or not."
      >
        <DownloadProgress />
      </Section>
      <Section title="Loading / Spinner">
        <Row style={{ gap: tokens.space["6"] }}>
          <Loading size="small" />
          <Loading label="Loading" />
          <Spinner size="large" color="success" vertical label="Fetching" />
        </Row>
        <View
          style={{
            height: 96,
            borderRadius: tokens.radius.md,
            backgroundColor: colors["surface-muted-color"],
            overflow: "hidden",
          }}
        >
          <Paragraph style={{ padding: tokens.space["3"] }}>
            Your order history
          </Paragraph>
          <Loading overlay label="Refreshing" />
        </View>
      </Section>
      <Section title="Skeleton" description="Placeholders while content loads.">
        <FeedSkeleton />
      </Section>
      <Section title="Empty" description="Nothing to show yet.">
        <Empty
          title="Your cart is empty"
          description="Items you add to your cart will show up here."
          action={
            <Button size="small" onPress={() => toast("Browsing the shop")}>
              Start shopping
            </Button>
          }
        />
        <Empty size="small" title="No results" description={null} />
      </Section>
    </Screen>
  );
}
