// For convenience, this library re-exports several values from @remote-ui/core, like createRemoteRoot
import {render, createRemoteRoot} from '@remote-ui/react';

// a remote component — see implementation below for getting strong
// typing on the available props.
const Button = 'Button';

// Assuming we get a function that will communicate with the host...
const channel = () => {};

const remoteRoot = createRemoteRoot(channel, {
  components: [Button],
});

function App() {
  return <Button onClick={() => console.log('clicked!')}>Click me!</Button>;
}

render(<App />, remoteRoot);