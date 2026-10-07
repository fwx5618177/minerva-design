import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@minerva/lib-core";

const types = ["default", "noHeader", "noFooter", "noHeaderFooter"] as const;

export default function TypesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {types.map((type) => (
        <Card key={type} type={type}>
          <CardHeader>
            <CardTitle>Header</CardTitle>
          </CardHeader>
          <CardContent>type=&quot;{type}&quot;</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      ))}
    </div>
  );
}
