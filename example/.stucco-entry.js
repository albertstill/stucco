
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Playground from '/home/j/dev/os/stucco/lib/playground.js';
    const Component = require('/home/j/dev/os/stucco/example/src/index.js');
    const mountNode = document.querySelector('.app');

    ReactDOM.render(
      <Playground component={ Component.Component } fixtures={ Component.fixtures } />,
      mountNode
    );
  