import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Flashcard } from "minerva-design/native";

const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];

export default function Basic() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = deck[index]!;
  const next = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };
  return (
    <View style={{ gap: 12 }}>
      <Flashcard
        front={card.front}
        back={card.back}
        backLabel="Definition"
        flipped={flipped}
        onFlippedChange={setFlipped}
        minHeight={160}
        footer={
          flipped ? (
            <>
              <Button size="small" variant="outline" onPress={next}>
                Again
              </Button>
              <Button size="small" onPress={next}>
                Good
              </Button>
            </>
          ) : null
        }
      />
      <Text>
        Card {index + 1} / {deck.length} · tap to flip
      </Text>
    </View>
  );
}
