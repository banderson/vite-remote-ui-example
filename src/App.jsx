import { useEffect, useMemo } from "react";
import { createEndpoint } from "@remote-ui/rpc";
import {
  createController,
  createRemoteReceiver,
  RemoteRenderer,
} from "@remote-ui/react/host";


export default function App() {
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
    <div className="App">
      The buttons below are rendered from a web worker.
      <br />
      <br />
      <RemoteRenderer receiver={receiver} controller={controller} />
    </div>
  );
}


function Button({ onClick, children }) {
  return (
    <button type="button" onClick={() => onClick?.()}>
      {children}
    </button>
  );
}
