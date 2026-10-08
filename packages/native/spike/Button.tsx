import { useState } from "react";
import { Pressable, Text, type GestureResponderEvent } from "react-native";

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export function Button({ label, disabled = false, onPress }: ButtonProps) {
  const [count, setCount] = useState(0);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={(e) => {
        setCount((c) => c + 1);
        onPress?.(e);
      }}
      testID="button"
    >
      <Text>{`${label} (${count})`}</Text>
    </Pressable>
  );
}
