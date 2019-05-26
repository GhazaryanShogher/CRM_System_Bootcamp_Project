import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { FormattedMessage } from "react-intl";
import Close from '../Close/Close';
import './Form.css';
import Div from "../../Div/Div";

class Form extends Component {

// Registration popup
  render() {
    return (
      <div style = {{display:this.props.display}}>
        <div className="form" >
            <h2>{<FormattedMessage id="addContact"/>}</h2>
            <Close callback = {this.props.close} />
            <div className="inp_edit">
              <Input id="full" type="text" text={<FormattedMessage id="fullName"/>} placeholder="Full Name" callback = {this.props.callback} val = {this.props.name}/>          
              <Input id="company" type="text" text={<FormattedMessage id="company"/>} placeholder="Company Name" callback = {this.props.callback} val = {this.props.company}/>
              <Input id="emailaddress" type="text" text={<FormattedMessage id="email"/>} placeholder="Email" callback = {this.props.callback} val = {this.props.emailaddress}/>
              <Input id="country" type="test" text={<FormattedMessage id="counrty"/>} placeholder="Country" callback = {this.props.callback} val = {this.props.country}/>
              <Input id="position" type="text" text={<FormattedMessage id="position"/>} placeholder="Position" callback = {this.props.callback} val = {this.props.position}/>
            </div>
              <Div className = "warningText" display = {this.props.warningDisplay} name = {this.props.warningText}/>
              <Button className={ "CB1 popupBtn" } name = {<FormattedMessage id="addContact"/>} click = {this.props.click }/>
            
        </div> 
      </div>
    );
  }
}

export default Form;
