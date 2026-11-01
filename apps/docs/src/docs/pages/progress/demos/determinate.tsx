import { useState } from "react";
import { Button, ProgressIndicator } from "minerva-design";

export default function DeterminateDemo() {
  const [lessons, setLessons] = useState(2);
  return (
    <div style={{ display: "grid", gap: 20, width: "100%" }}>
      <ProgressIndicator
        variant="bar"
        full
        value={lessons}
        max={5}
        showValue
        format={(value, max) => `${value} / ${max}`}
        label="Lessons completed"
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "center",
        }}
      >
        <ProgressIndicator
          variant="circle"
          size="xlarge"
          value={(lessons / 5) * 100}
          showValue
          aria-label="Course progress"
        />
        <ProgressIndicator
          variant="bar"
          color="success"
          value={100}
          showValue
          aria-label="Done"
        />
        <ProgressIndicator
          variant="bar"
          color="warning"
          value={60}
          showValue
          aria-label="Due soon"
        />
        <ProgressIndicator
          variant="bar"
          color="danger"
          value={15}
          showValue
          aria-label="Overdue"
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          size="small"
          variant="outline"
          disabled={lessons === 0}
          onClick={() => setLessons((n) => Math.max(0, n - 1))}
        >
          Undo lesson
        </Button>
        <Button
          size="small"
          disabled={lessons === 5}
          onClick={() => setLessons((n) => Math.min(5, n + 1))}
        >
          Complete lesson
        </Button>
      </div>
    </div>
  );
}
