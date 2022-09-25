# remote-ui with Vite

This is a simple example for using [remote-ui](https://github.com/Shopify/remote-ui) to render a React component remotely in a web worker. It works out-of-the-box with Vite's official `react` and `react-ts` boilerplates, but requires us to disable React fast refresh in vite.config.

This example is implemented using the `@remote-ui/react` and `@remote-ui/rpc` packages.