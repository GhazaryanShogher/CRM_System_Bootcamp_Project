import React, { Component } from 'react';
import './menu.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

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
        <Button disabled={this.state.contactButtonStatus} name = {<Link className={this.state.contactLinkStatus} to="/Contacts">Contats</Link>}  className= {"CB1 menu_btn" }/>          
        <Button disabled={this.state.mailButtonStatus} name = {<Link className={this.state.mailLinkStatus} to="Mailinglist">MailingList</Link>}  className= {"CB1 menu_btn"} />        
      </div>
    );
  }
}

export default Menu;