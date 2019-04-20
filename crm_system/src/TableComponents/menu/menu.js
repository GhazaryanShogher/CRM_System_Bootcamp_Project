import React, { Component } from 'react';
import './menu.css';
import Button from '../Button/Button';

class Menu extends Component{
  render(){
    return(
          <div className="menu">
                  <ul className="list_menu">
                      <li className="menu_item">
                      <Button name = {"Contats"}  className= "CB1 menu_btn" />
                      
                       </li>
                       <li className="menu_item">
                       <Button name = {"Mailing List"}  className= "CB1 menu_btn" />
                       </li>
                 </ul>
          </div>
    );
  }
}
export default Menu;