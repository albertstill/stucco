import React from 'react';
import styles from './styles.scss';

export default class HelloWorld extends React.Component {
  render() {
    return (
      <p className={styles.large}>
        {this.props.greeting} {this.props.target}
      </p>
    );
  }
}

HelloWorld.propTypes = {
  greeting: React.PropTypes.string,
  target: React.PropTypes.string,
};
