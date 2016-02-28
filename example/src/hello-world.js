import React, { Component } from 'react';

import styles from './hello-world.scss';

export default class HelloWorld extends Component {
  render() {
    return (
      <p className={styles.large}>{this.props.greeting} {this.props.target}</p>
    );
  }
}

