import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Playground from './playground.js';
import HelloWorld from './hello-world.js';

class App extends Component {
  constructor(props) {
    super(props);

    const fixtures = [
      { greeting: 'Hello', target: 'Jacob' },
      { greeting: 'Hello', target: 'World' },
    ];

    this.fixtures = fixtures;
  }
  render() {
    return <Playground component={HelloWorld} fixtures={this.fixtures} />;
  }
}

ReactDOM.render(<App />, document.querySelector('.app'));
