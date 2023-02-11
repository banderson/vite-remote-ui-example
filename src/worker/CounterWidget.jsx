import React, { useState } from "react";
import Button from './Button';

export default function CounterWidget() {
  const [count, setCount] = useState(0);

  return (
    <>
      {count > 0 && (
        <Button onClick={() => setCount((count) => count - 1)}>-</Button>
      )}
      <Button>{count}</Button>
      {count < 10 && (
        <Button onClick={() => setCount((count) => count + 1)}>+</Button>
      )}
    </>
  );
}
