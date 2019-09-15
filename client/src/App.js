import React from 'react';
import './App.css';

function App() {

function getJokes() {
  fetch('/api/jokes')
  .then(res => {
     console.log('response', res)
  })
}


  return (
    <div className="App">
     <button onClick={getJokes}>Get Jokes</button>
    </div>
  );
}

export default App;
