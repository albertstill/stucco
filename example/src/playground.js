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
        <Dock position="right" isVisible={true} size={this.state.dockVisible ? 0.055 : 0.5} dimMode="none">
          <div className={styles['toggle-button']} onClick={this.toggleDock}>{this.state.dockVisible ? '<<' : '>>'}</div>
          <ul className={styles['fixture-list']}>{fixtureLinks}</ul>
        </Dock>
        { React.createElement(this.props.component, this.props.fixtures[this.state.active].props) }
      </div>
    );
  }
}
