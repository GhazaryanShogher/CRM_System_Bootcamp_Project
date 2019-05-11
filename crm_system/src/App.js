import React, { Component } from 'react';
// import MainTable  from './TableComponents/MainTable';
import { connect } from 'react-redux';
import MainPage from "./MainViewComponents/Main/Main";
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MailingList from './TableComponents/MailingList/MailingList';
import Header from './TableComponents/Header/header';
import TableContent from './TableComponents/tableContent/tableContent';
import {IntlProvider} from 'react-intl';
import messages from './messages';

class App extends Component {
  render() {
    const {lang} = this.props;
    return (
      <IntlProvider locale = {lang} messages = {messages[lang]}>
        <Router>
          <div className="App">
            <Route path="/Contacts" component={ Header } />
            <Route path="/MailingList" component={ Header } />
            <Route path="/" component={ MainPage } exact />
            <Route path="/Contacts" component={ TableContent } />
            <Route path="/MailingList" component={ MailingList } />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

// App.propTypes = {
//   lang:PropTypes.string.isRequired
// }

const mapStateToProps = (state) => {
  return {
      name: state.data,
      lang:state.locale.lang
  }
}

export default App;
