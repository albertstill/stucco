import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './index.scss';

class HelloWorld extends Component {
  render() {
    return (
      <p className={styles.large}>{this.props.greeting} {this.props.target}</p>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    const fixtures = [
      { greeting: 'Hello', target: 'Jacob' },
      { greeting: 'Hello', target: 'World' },
    ];

    this.fixtures = fixtures;
    this.state = { active: 0 };
  }
  render() {
    const fixtureLinks = this.fixtures.map((f, i) => {
      return <li className={this.state.active === i ? styles.active : ''} key={JSON.stringify(f)}><div onClick={() => { this.setState({active: i})}}>{JSON.stringify(f)}</div></li>
    });

    return (
      <div>
        <div>
          <ul>{fixtureLinks}</ul>
        </div>
        <HelloWorld {...this.fixtures[this.state.active]} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.app')
);
