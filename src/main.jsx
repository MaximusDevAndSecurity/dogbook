import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
