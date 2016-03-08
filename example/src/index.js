import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Playground from './playground.js';
import HelloWorld from './hello-world.js';

class App extends Component {
  constructor(props) {
    super(props);

    const fixtures = [
      { label: '01', props: { greeting: 'Hello', target: '01World' } },
      { label: '02', props: { greeting: 'Hello', target: '02World' } },
      { label: '03', props: { greeting: 'Hello', target: '03World' } },
      { label: '04', props: { greeting: 'Hello', target: '04World' } },
      { label: '05', props: { greeting: 'Hello', target: '05World' } },
      { label: '06', props: { greeting: 'Hello', target: '06World' } },
      { label: '07', props: { greeting: 'Hello', target: '07World' } },
      { label: '08', props: { greeting: 'Hello', target: '08World' } },
      { label: '09', props: { greeting: 'Hello', target: '09World' } },
      { label: '10', props: { greeting: 'Hello', target: '10World' } },
      { label: '11', props: { greeting: 'Hello', target: '11World' } },
      { label: '12', props: { greeting: 'Hello', target: '12World' } },
      { label: '13', props: { greeting: 'Hello', target: '13World' } },
      { label: '14', props: { greeting: 'Hello', target: '14World' } },
    ];

    this.fixtures = fixtures;
  }
  render() {
    return <Playground component={ HelloWorld } fixtures={ this.fixtures } />;
  }
}

ReactDOM.render(<App />, document.querySelector('.app'));
