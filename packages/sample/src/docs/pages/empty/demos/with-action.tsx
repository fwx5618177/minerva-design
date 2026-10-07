import { Button, Empty } from "@minerva/lib-core";

export default function WithActionDemo() {
  return (
    <Empty description="You have no projects yet">
      <Button size="small">Create project</Button>
    </Empty>
  );
}
