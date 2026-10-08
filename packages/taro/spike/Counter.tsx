import { Button, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";

export interface CounterProps {
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
  onIncrement?: (next: number) => void;
}

export function Counter({
  disabled,
  className,
  style,
  buttonClassName,
  buttonStyle,
  onIncrement,
}: CounterProps) {
  const [count, setCount] = useState(0);
  return (
    <View className={className} style={style} data-testid="root">
      <Text data-testid="count">Count: {count}</Text>
      <Button
        disabled={disabled}
        // Taro H5 <Button> renders a plain <div> (no implicit button role, no native disabled),
        // so the library must add a11y attributes itself. They pass through restProps.
        // `role` is not in Taro's ButtonProps typings -> pass via spread (no excess-prop check).
        {...{ role: "button" }}
        aria-disabled={disabled || undefined}
        className={buttonClassName}
        style={buttonStyle}
        data-testid="btn"
        onClick={() => {
          const next = count + 1;
          setCount(next);
          onIncrement?.(next);
          Taro.showToast({ title: `count ${next}`, icon: "none" });
        }}
      >
        Increment
      </Button>
    </View>
  );
}
