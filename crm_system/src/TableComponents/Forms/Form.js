import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './Form.css';

class Form extends Component {
    constructor(props){
        super(props)
    }
// Registration popup
  render() {
    return (
        <div className="form" style={{display:this.props.status}}>
            <h1>Registration</h1>
            <Input id="first" type="text" placeholder="First Name"/>          
            <Input id="last" type="text" placeholder="Last Name"/>
            <Input id="emailaddress" type="email" placeholder="Email"/>
            <Input id="userId" type="text" placeholder="Login"/>
            <Input id="pass" type="password" placeholder="Password"/>
            <Input id="confpassword" type="password" placeholder="Confirm password"/>
            <Input id="confpassword" type="password" placeholder="Confirm password"/>
            <Input id="confpassword" type="password" placeholder="Confirm password"/>
            <Button name = "Registration"/>
        </div>
    );
  }
}

export default Form;
