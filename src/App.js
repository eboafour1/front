// src/App.js

import React from 'react';
import './App.css';
import SearchBar from './SearchBar';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Web Crwaler</h1>
        <SearchBar />
      </header>
    </div>
  );
};

export default App;
