import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Close from '../Close/Close';
import './Form.css';
import Div from "../../Div/Div";

class Form extends Component {


// Registration popup
  render() {
    return (
      <div style = {{display:this.props.display}}>
        <div className="form" >
            <h1>Create New Contact</h1>
            <Close callback = {this.props.close} />
            <div className="inp_edit">
              <Input id="full" type="text" text={"Full Name"} placeholder="Full Name" callback = {this.props.callback} val = {this.props.name}/>          
              <Input id="company" type="text" text={"Company"} placeholder="Company Name" callback = {this.props.callback} val = {this.props.company}/>
              <Input id="emailaddress" type="text" text={"E-mail"} placeholder="Email" callback = {this.props.callback} val = {this.props.emailaddress}/>
              <Input id="country" type="test" text={"Country"} placeholder="Country" callback = {this.props.callback} val = {this.props.country}/>
              <Input id="position" type="text" text={"Position"} placeholder="Position" callback = {this.props.callback} val = {this.props.position}/>
            </div>
              <Div className = "warningText" display = {this.props.warningDisplay} name = {this.props.warningText}/>
              <Button className={ "CB1 popupBtn" } name = "Create contact" click = {this.props.click }/>
            
        </div> 
      </div>
    );
  }
}

export default Form;
