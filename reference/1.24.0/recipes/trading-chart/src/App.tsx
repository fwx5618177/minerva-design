import { useState } from "react";
import { Button, ConfigProvider, HStack, VStack } from "minerva-design";
import { TradingChart, type TradingScaleMode } from "minerva-design/charts";
import { bars } from "./data";
export default function App() {
  const [scaleMode, setScaleMode] = useState<TradingScaleMode>("linear");
  return (
    <ConfigProvider theme="light">
      <VStack gap={4}>
        <HStack gap={2}>
          {(["linear", "log", "percent"] as const).map((mode) => (
            <Button
              key={mode}
              aria-pressed={scaleMode === mode}
              onClick={() => setScaleMode(mode)}
            >
              {mode}
            </Button>
          ))}
        </HStack>
        <TradingChart
          bars={bars}
          symbol="DEMO"
          timeframe="1D"
          scaleMode={scaleMode}
          height={400}
          ariaLabel="Demo daily prices"
        />
        <output aria-live="polite">
          {bars.length} bars · {scaleMode}
        </output>
      </VStack>
    </ConfigProvider>
  );
}
