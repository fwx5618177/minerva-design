import { Flashcard } from "minerva-design";

export default function BasicDemo() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Flashcard
        front="What is the capital of Australia?"
        back="Canberra"
        showHint
      />
    </div>
  );
}
