import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "minerva-design";

export default function BasicDemo() {
  const [opened, setOpened] = useState(false);
  return (
    <div style={{ width: 340 }}>
      <Card>
        <CardHeader>
          <CardTitle>Project Apollo</CardTitle>
          <CardDescription>Updated 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          A design system for building accessible, themeable interfaces.
        </CardContent>
        <CardFooter>
          <Button size="small" onClick={() => setOpened(true)}>
            Open
          </Button>
        </CardFooter>
      </Card>
      {opened && <p role="status">Opened Project Apollo</p>}
    </div>
  );
}
