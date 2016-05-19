import React from 'react';
import ReactDOM from 'react-dom';
import Component from './src/components/hello';

// change this to your actual entry dom node/nodes
const entryPoint = '.entry-point';

// change this to your actual props
const props = { greeting: 'hello', target: 'world' };

ReactDOM.render(
  <Component {...props} />,
  document.querySelector(entryPoint)
);
