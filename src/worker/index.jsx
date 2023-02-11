import React from "react";
import { createRemoteRoot, createRoot } from "@remote-ui/react";
import { createEndpoint, retain } from "@remote-ui/rpc";
import CounterWidget from './CounterWidget';
import Button from './Button';

let remoteRoot;

const renderCounterWidget = (receiver) => {
  retain(receiver);

  if (!remoteRoot) {
    remoteRoot = createRemoteRoot(receiver, {
      components: [Button],
    });
  }

  createRoot(remoteRoot).render(<CounterWidget receiver={receiver} />);
  remoteRoot.mount()
};

const endpoint = createEndpoint(self);

endpoint.expose({ renderCounterWidget });
