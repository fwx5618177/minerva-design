import { useState } from "react";
import { Button, Flashcard } from "minerva-design";

export default function ReducedDisabledDemo() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      }}
    >
      <Flashcard
        front="Disabled"
        back="Never shown by a click"
        disabled
        minHeight={140}
      />
      <Flashcard
        front="flipOnClick={false}"
        back="Flipped by the button below"
        flipOnClick={false}
        flipped={flipped}
        frontLabel={null}
        backLabel={null}
        minHeight={140}
        footer={
          <Button size="small" onClick={() => setFlipped((f) => !f)}>
            {flipped ? "Hide answer" : "Reveal answer"}
          </Button>
        }
      />
    </div>
  );
}
