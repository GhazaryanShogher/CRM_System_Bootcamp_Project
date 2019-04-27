import React, { Component } from 'react';
import './menu.css';
import Button from '../Button/Button';

class Menu extends Component{
  render(){
    return(
          <div className="menu">
                  
                      <Button name = {"Contats"}  className= "CB1 menu_btn" />
                      
                      
                       
                       <Button name = {"Mailing List"}  className= "CB1 menu_btn" />
                      
              
          </div>
    );
  }
}
export default Menu;