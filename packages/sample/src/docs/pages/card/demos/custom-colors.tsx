import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@minerva/lib-core";

export default function CustomColorsDemo() {
  return (
    <div style={{ width: 340 }}>
      <Card variant="outlined">
        <CardHeader bgColor="#4f46e5" textColor="#ffffff">
          <CardTitle>Pro plan</CardTitle>
          <CardDescription>Everything in Free, plus more</CardDescription>
        </CardHeader>
        <CardContent bgColor="#eef2ff" textColor="#312e81">
          Unlimited projects, priority support and advanced analytics.
        </CardContent>
        <CardFooter bgColor="#e0e7ff" textColor="#312e81">
          <Button size="small">Upgrade</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
