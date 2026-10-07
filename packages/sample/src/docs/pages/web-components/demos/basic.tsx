import { useState } from "react";
// Registers <minerva-button>. For JSX typings add (e.g. in global.d.ts):
// /// <reference types="@minerva/lib-web-components/react" />
import "@minerva/lib-web-components";

export default function BasicDemo() {
  const [count, setCount] = useState(0);

  return (
    <>
      <minerva-button onClick={() => setCount((c) => c + 1)}>
        Clicked {count} times
      </minerva-button>
      <minerva-button variant="secondary" onClick={() => setCount(0)}>
        Reset
      </minerva-button>
    </>
  );
}
