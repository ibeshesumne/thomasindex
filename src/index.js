import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot API for React 18+
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/Auth/AuthContext'; // Import AuthProvider

// Create root and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// Optional: Log performance metrics
reportWebVitals();
