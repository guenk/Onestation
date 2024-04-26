import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Import du Provider de react-redux
import { PersistGate } from 'redux-persist/integration/react'; // Import du PersistGate si tu utilises Redux Persist
import { store, persistor } from './redux/store'; // Assure-toi que ces chemins sont corrects
import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>  
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>  
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);