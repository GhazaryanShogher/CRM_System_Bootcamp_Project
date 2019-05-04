import React, { Component } from 'react';
import './menu.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

class Menu extends Component{
  render(){
    return(
          <div className="menu">
                  
                      <Button name = {<Link to="/Contacts">"Contats"</Link>}  className= {"CB1 menu_btn" }/>
                      
                      
                       
                       <Button name = {<Link to="Mailinglist">"MailingList"</Link>}  className= {"CB1 menu_btn"} />
                      
              
          </div>
    );
  }
}
export default Menu;