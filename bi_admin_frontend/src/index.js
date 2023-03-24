import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import env from 'react-dotenv';

ReactDOM.render(
  <ContextProvider >
      <App />
  </ContextProvider>,
  document.getElementById('root'),
);
