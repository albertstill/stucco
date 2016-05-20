import React from 'react';
import ReactDOM from 'react-dom';
import Stucco from 'stucco';
import HelloWorld from '../src/components/helloWorld';
import fixtures from './fixtures';

ReactDOM.render(
  <Stucco component={HelloWorld} fixtures={fixtures} />,
  document.querySelector('.app')
);
