import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends Component {
  render() {
    return (
      <p>{this.props.greeting} {this.props.target}</p>
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
