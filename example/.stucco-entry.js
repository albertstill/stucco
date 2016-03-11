
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Playground from '/home/j/dev/os/stucco/lib/playground.js';
    const Component = require('/home/j/dev/os/stucco/example/src/hello-world.js').default;
    const fixtures = require('/home/j/dev/os/stucco/example/fixtures.js').default;
    const mountNode = document.querySelector('.app');

    ReactDOM.render(
      <Playground component={ Component } fixtures={ fixtures } />,
      mountNode
    );
  