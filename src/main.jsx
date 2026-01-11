// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
   
// import { store } from './app/store'
// import { Toaster } from 'react-hot-toast';

// createRoot(document.getElementById('root')).render(
// <Provider store={store}>
// <App />
// <Toaster />
// </Provider>
  

// )







import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" />
  </React.StrictMode>
);