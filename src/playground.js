import React, { Component } from 'react';
import styles from './playground.scss';
import Dock from 'react-dock';

function toggleDock() {
  this.setState({ dockVisible: !this.state.dockVisible });
}

export default class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 0, dockVisible: false };
    this.toggleDock = toggleDock.bind(this);
  }

  getChildContext() {
    return {
      context: this.props.fixtures[this.state.active].context,
    };
  }

  render() {
    const fixtureLinks = this.props.fixtures.map(({ label, props }, i) => {
      const itemClass = this.state.active === i ? `${styles.active}` : styles.inactive;
      const key = label + JSON.stringify(props);
      const clickHandler = () => { this.setState({ active: i }); };

      return (
        <li className={itemClass} key={ key }>
          <div style={{ height: '100%' }} onClick={ clickHandler }>
            <div className={styles.label}>
              { this.state.active === i ? `* ${label}` : label }
            </div>

            <div className={styles.props}>
              Props: { JSON.stringify(props) }
            </div>
          </div>
        </li>
      );
    });

    return (
      <div>
        <div className={styles.dockContainer}>
          <div className={styles.dock}>
            <Dock position="right" isVisible dimMode="none">
              <ul className={styles['fixture-list']}>{fixtureLinks}</ul>
            </Dock>
          </div>
        </div>
        { React.createElement(this.props.component, this.props.fixtures[this.state.active].props) }
      </div>
    );
  }
}

Playground.childContextTypes = {
  context: React.PropTypes.object,
};

Playground.propTypes = {
  fixtures: React.PropTypes.array.isRequired,
  component: React.PropTypes.func.isRequired,
};
