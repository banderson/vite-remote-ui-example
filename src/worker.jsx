import {
  createRemoteReactComponent,
  createRemoteRoot,
  render,
} from "@remote-ui/react";
import { createEndpoint, retain } from "@remote-ui/rpc";
import React, { useState } from "react";

const Button = createRemoteReactComponent("Button");

function CounterWidget() {
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

function App() {
  return <CounterWidget />;
}

let remoteRoot;

const renderCounterWidget = (receiver) => {
  retain(receiver);

  if (!remoteRoot) {
    remoteRoot = createRemoteRoot(receiver, {
      components: [Button],
    });
  }

  render(<App receiver={receiver} />, remoteRoot, () => remoteRoot.mount());
};

const endpoint = createEndpoint(self);

endpoint.expose({ renderCounterWidget });
