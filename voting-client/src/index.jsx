import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Mad Max', 'Who am I?'];

ReactDOM.render(
  <Voting pair={pair} hasVoted="Mad Max"/>,
  document.getElementById('app')
);