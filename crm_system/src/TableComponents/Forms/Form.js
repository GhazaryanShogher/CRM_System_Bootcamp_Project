import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './Form.css';

class Form extends Component {
// Registration popup
  render() {
    return (
        <div className="form" style={{display:this.props.status}}>
        
        <span className= "close">x</span>
            <h1>Create New Contact</h1>
            <Input id="full" type="text" placeholder="Full Name"/>          
            <Input id="company" type="text" placeholder="Company Name"/>
            <Input id="emailaddress" type="email" placeholder="Email"/>
            <Input id="userId" type="text" placeholder="QuID"/>
            <Input id="country" type="password" placeholder="Country"/>
            <Input id="position" type="password" placeholder="Position"/>
            <Button name = "Create contact"/>
        </div>
    );
  }
}

export default Form;
