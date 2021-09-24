import React, { useEffect } from 'react';
import './App.css';
import { Router } from "react-router-dom";
import Routes from "../src/routes/Routes";
import history from './routes/History'


function App() {
  useEffect(() => {
    window.addEventListener('online', () => {
      alert("You are back online", "Back online");

    })
    window.addEventListener('offline', () => {
      alert("Connection is lost", "Pure Connection");
    });
  })
  return (
    <div className="App">
      <Router history={history}>
        {Routes}
      </Router>
    </div>
  );
}

export default App;
