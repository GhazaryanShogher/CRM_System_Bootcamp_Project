import React, { Component } from 'react';
import MainTable  from './TableComponents/MainTable';
import MainPage from "./MainViewComponents/Main/Main";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <MainPage/>
          {/* <MainTable/> */}
      </div>
    );
  }
}

export default App;
