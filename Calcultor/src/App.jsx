import React from 'react';
import NumberFetcher from './components/NumberFetch';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Number Window Viewer</h1>
        <p>Microservice for calculating averages of number sequences</p>
      </header>
      <main>
        <NumberFetcher />
      </main>
    </div>
  );
}

export default App;