import React, { Component } from 'react';
import './menu.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {localeSet, SetLocale} from '../../Actions/locale';
import {bindActionCreators} from 'redux';

class Menu extends Component{
  state = {
    contactLinkStatus: "",
    contactButtonStatus: false,
    mailLinkStatus: "",
    mailButtonStatus: false,
  }
  componentDidMount(){
    if(window.location.pathname === "/Contacts") {
      this.setState({contactLinkStatus: "disabled-link", contactButtonStatus: true, mailLinkStatus: "", mailButtonStatus: false})
    }
    if(window.location.pathname === "/Mailinglist") {
      this.setState({mailLinkStatus: "disabled-link", mailButtonStatus: true, contactLinkStatus: "", contactButtonStatus: false})
    }
  }

  render(){
    return(
      <div className="menu">
      <a role = "button" onClick = {this.props.SetLocale(("en"))}>en</a> |
      <a role = "button" onClick = {this.props.SetLocale(("am"))}>am</a>
        <Button disabled={this.state.contactButtonStatus} name = {<Link className={this.state.contactLinkStatus} to="/Contacts"><FormattedMessage id = "header.contacts" defaultMessage = "Contacts"/></Link>}  className= {"CB1 menu_btn" }/>          
        <Button disabled={this.state.mailButtonStatus} name = {<Link className={this.state.mailLinkStatus} to="Mailinglist"><FormattedMessage id = "header.mailingList" defaultMessage = "MailingList"/></Link>}  className= {"CB1 menu_btn"} />        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      lang:state.lang
  }
}
export default connect (mapStateToProps,{SetLocale})(Menu);