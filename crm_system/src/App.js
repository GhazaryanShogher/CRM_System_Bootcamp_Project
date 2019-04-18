import React, { Component } from 'react';
import MainTable  from './TableComponents/MainTable';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <MainTable/>
      </div>
    );
  }
}

export default App;
