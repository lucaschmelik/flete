import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/layouts/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById('root')
);