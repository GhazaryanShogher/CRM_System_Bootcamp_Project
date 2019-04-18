import React, { Component } from 'react';
import './menu.css';

class Menu extends Component{
  render(){
    return(
          <div className="menu">
                  <ul className="list_menu">
                      <li className="menu_item">Contacts </li>
                       <li className="menu_item">Mailing list</li>
                 </ul>
          </div>
    );
  }
}
export default Menu;