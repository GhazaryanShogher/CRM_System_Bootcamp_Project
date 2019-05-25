import React, { Component } from 'react';
import './menu.css';
import arm from './arm.png';
import usa from './usa.png';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import * as locale from "../../Actions/locale";
import {connect} from 'react-redux';
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
        <Button disabled={this.state.contactButtonStatus} name = {<Link className={this.state.contactLinkStatus} to="/Contacts"><FormattedMessage id="contacts"/></Link>}  className= {"CB1 menu_btn" }/>          
        <Button disabled={this.state.mailButtonStatus} name = {<Link className={this.state.mailLinkStatus} to="Mailinglist"><FormattedMessage id="mailinglist"/></Link>}  className= {"CB1 menu_btn"} />        
      <img src={arm} alt="am" width="30px" height="20px" onClick = {()=>this.props.setLocale('am')}/>
      <img src={usa} alt="en" width="30px" height="20px" onClick = {()=>this.props.setLocale('en')}/>
      </div>
    );
  }
}

const mapStateToprops = (state) => {
  return {lang : state.locale.lang}
}
const mapDispatchToProps = (dispatch) => {
  const {localSet,setLocale } = bindActionCreators(locale,dispatch);
    return {localSet,setLocale 
  }
}
export default connect (mapStateToprops, mapDispatchToProps)(Menu);