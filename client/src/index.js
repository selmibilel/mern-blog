import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import axios from "axios";
import { baseURL } from './shared/baseUrl';
import { ContextProvider } from './context/Context';


axios.defaults.baseURL = baseURL;

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


