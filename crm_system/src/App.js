import React, { Component } from 'react';
import MainTable  from './TableComponents/MainTable';
//import { connect } from 'react-redux';
import MainPage from "./MainViewComponents/Main/Main";
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MailingList from './TableComponents/MailingList/MailingList';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={ MainPage } exact />
          <Route path="/Contacts" component={ MainTable } />
          <Route path="/MailingList" component={ MailingList } />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      name: state.data
  }
}

export default App;

