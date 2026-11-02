import { Flashcard } from "minerva-design";

export default function AxisVariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
    >
      <Flashcard
        variant="elevated"
        front="elevated · axis y"
        back="Flips horizontally"
        minHeight={140}
      />
      <Flashcard
        variant="outline"
        axis="x"
        front="outline · axis x"
        back="Flips vertically"
        minHeight={140}
      />
      <Flashcard
        variant="filled"
        size="small"
        front="filled · small"
        back="Less padding, smaller type"
        minHeight={140}
      />
      <Flashcard
        size="large"
        front="large"
        back={
          <>
            The card grows to fit the taller face: this answer is much longer
            than the question, and the card height follows it on both sides.
          </>
        }
        minHeight={140}
      />
    </div>
  );
}
