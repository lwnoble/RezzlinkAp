import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './userContext'
import './App.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
