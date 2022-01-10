import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/layouts/Header';
import Grilla from './components/views/Grilla';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Grilla />
  </React.StrictMode>,
  document.getElementById('root')
);