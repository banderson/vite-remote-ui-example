import {
  createController,
  createRemoteReceiver,
  RemoteRenderer,
} from "@remote-ui/react/host";
import { createEndpoint } from "@remote-ui/rpc";
import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [show, setShow] = useState(true);

  return (
    <div className="App">
      <button
        onClick={() => {
          setShow((show) => !show);
        }}
      >
        Toggle
      </button>

      <br />
      <br />

      {show && <RemoteCounterWidget />}
    </div>
  );
}

export default App;

function Button({ onClick, children }) {
  return (
    <button type="button" onClick={() => onClick?.()}>
      {children}
    </button>
  );
}

function RemoteCounterWidget() {
  const receiver = useMemo(() => createRemoteReceiver(), []);
  const controller = useMemo(
    () =>
      createController({
        Button,
      }),
    []
  );

  useEffect(() => {
    const worker = new Worker(new URL("./worker", import.meta.url), {
      type: "module",
    });

    const endpoint = createEndpoint(worker);

    endpoint.call.renderCounterWidget(receiver.receive);

    return () => {
      endpoint.terminate();
    };
  }, [receiver]);

  return (
    <>
      The buttons below are rendered from a web worker.
      <br />
      <br />
      <RemoteRenderer receiver={receiver} controller={controller} />
    </>
  );
}
