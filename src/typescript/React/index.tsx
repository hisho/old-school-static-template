import React from 'react';
import ReactDOM from 'react-dom';
import From from './from/from';

const fromRootElement = document.getElementById('from');

if (fromRootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <From />
    </React.StrictMode>,
    fromRootElement,
  );
}
