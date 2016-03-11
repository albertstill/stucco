import React from 'react';

import styles from './hello-world.scss';

export default function HelloWorld({ greeting, target }) {
  return (
    <p className={styles.large}>{greeting} {target}</p>
  );
}

HelloWorld.propTypes = {
  greeting: React.PropTypes.string,
  target: React.PropTypes.string,
};
