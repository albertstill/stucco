import React from 'react';
import ReactDOM from 'react-dom';
import Stucco from 'stucco';
import fixtures from './fixtures';
// change this to import the root component of your project
import HelloWorld from '../src/components/helloWorld';

ReactDOM.render(
  <Stucco component={HelloWorld} fixtures={fixtures} />,
  document.querySelector('.app')
);
