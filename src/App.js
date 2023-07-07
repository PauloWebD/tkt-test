import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Graph from './components/Graph';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/graph/:id/:name/:siren/:results" element={<Graph />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
