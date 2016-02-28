import React, { Component } from 'react';
import styles from './playground.scss';

export default class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 0 };
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
        <div>
          <ul>{fixtureLinks}</ul>
        </div>
        { React.createElement(this.props.component, this.props.fixtures[this.state.active]) }
      </div>
    );
  }
}
