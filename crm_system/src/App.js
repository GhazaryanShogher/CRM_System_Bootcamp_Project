import React, { Component } from 'react';
import MainTable  from './TableComponents/MainTable';
//import { connect } from 'react-redux';
import MainPage from "./MainViewComponents/Main/Main";
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from "./TableComponents/Forms/Form"
import MailingList from './TableComponents/MailingList/MailingList';
import Header from './TableComponents/Header/header';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/Contacts" component={ Header } />
          <Route path="/MailingList" component={ Header } />
          <Route path="/" component={ MainPage } exact />
          <Route path="/Contacts" component={ MainTable } />
          <Route path="/Contacts/AddContact" component={ Form } />
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
