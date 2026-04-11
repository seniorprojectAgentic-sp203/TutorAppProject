import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from "./database/sliceStorage";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
  </StrictMode>
)
