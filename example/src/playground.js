import React, { Component } from 'react';
import styles from './playground.scss';
import Dock from 'react-dock';

export default class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 0, dockVisible: false };
    this.toggleDock = () => this.setState({dockVisible: !this.state.dockVisible});
  }

  render() {
    const fixtureLinks = this.props.fixtures.map((f, i) => {
      const itemClass = this.state.active === i ? styles.active : '';
      const key = JSON.stringify(f);
      const clickHandler = () => { this.setState({ active: i }); };
      const label = JSON.stringify(f);

      return (
        <li className={itemClass} key={ key }>
          <div onClick={ clickHandler }>
            { label }
          </div>
        </li>
      );
    });

    return (
      <div>
        <div style={{positiong: 'absolute', top: 0, right: 0}} onClick={() => this.toggleDock()}>Toggle Dock</div>
        <Dock position='right' isVisible={this.state.dockVisible}>
          <div onClick={() => this.toggleDock()}>Close Dock</div>
          <ul>{fixtureLinks}</ul>
        </Dock>
        { React.createElement(this.props.component, this.props.fixtures[this.state.active]) }
      </div>
    );
  }
}
