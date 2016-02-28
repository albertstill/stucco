import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styles from './index.scss';

console.log(styles)

class HelloWorld extends Component {
  render() {
    return (
      <p className={styles.large}>{this.props.greeting} {this.props.target}</p>
    );
  }
}

class App extends Component {
  render() {
    return (
      <HelloWorld greeting={'Hello'} target={'Jacob'}/>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.app')
);
