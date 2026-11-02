import { useState } from "react";
import { Button, Flashcard } from "minerva-design";

const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"] as const;

export default function ControlledDemo() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const card = deck[index];

  const rate = (rating: (typeof ratings)[number]) => {
    setLog((prev) => [...prev, `${card.front}: ${rating}`].slice(-3));
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <Flashcard
        front={<strong style={{ fontSize: "1.5rem" }}>{card.front}</strong>}
        back={card.back}
        frontLabel={`Card ${index + 1} / ${deck.length}`}
        backLabel="Definition"
        flipped={flipped}
        onFlippedChange={setFlipped}
        footer={
          flipped ? (
            ratings.map((rating) => (
              <Button
                key={rating}
                size="small"
                variant={rating === "Good" ? "solid" : "outline"}
                onClick={() => rate(rating)}
              >
                {rating}
              </Button>
            ))
          ) : (
            <Button size="small" onClick={() => setFlipped(true)}>
              Show answer
            </Button>
          )
        }
      />
      <output style={{ fontSize: 13 }}>
        {log.length ? log.join(" · ") : "Flip the card, then rate it."}
      </output>
    </div>
  );
}
