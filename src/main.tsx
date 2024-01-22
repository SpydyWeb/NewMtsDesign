import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Provider } from 'react-redux';
import { store } from './store';
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)
