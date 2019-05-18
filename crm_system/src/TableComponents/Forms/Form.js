import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Close from '../Close/Close';
import './Form.css';
import Div from "../../Div/Div";

class Form extends Component {
  state = {
    name:"",
    company:"",
    country:"",
    email:"",
    position:"",
    display:"block",
    warningDisplay: "none",
    warningText: "",
  }
  postRequest = () => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.company === "" || this.state.country === "" || this.state.name === "" || this.state.position === "") {
      return this.setState({warningDisplay: "block", warningText: "Please Enter Valid Information Text"})
    } 
    if (regEmail.test(this.state.email) === false) {
      return this.setState({warningDisplay: "block", warningText: "Please Enter Valid Email Address"})
    }
    else {
      return fetch('http://visual.istclabz.com:2112/api/contacts', {
        method: 'POST',
        body: JSON.stringify({
          "FullName": this.state.name,
          "CompanyName": this.state.company,
          "Position": this.state.position,
          "Country": this.state.country,
          "Email": this.state.email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
              return response.json()
      }).then(json => {
        console.log(json)
      }).then(() => {
        this.setState({
          name: "",
          email: "",
          company: "",
          country: "",
          position: "",
          warningDisplay: "none",
          warningText: "",
        })
      })
    }
  }

  callback = (e) => {
    switch(e.target.id){
      case "full":
      this.setState({name:e.target.value})
      break;
      case "company":
      this.setState({company:e.target.value})
      break;
      case "country":
      this.setState({country:e.target.value})
      break;
      case "emailaddress":
      this.setState({email:e.target.value})
      break;
      case "position":
      this.setState({position:e.target.value})
      break;
      default:
      break;
    }
  }

// Registration popup
  render() {
    return (
      <div style = {{display:this.props.display}}>
        <div className="form" >
            <h1>Create New Contact</h1>
            <Close callback = {this.props.close} />
            <div className="inp_edit">
              <Input id="full" type="text" text={"Full Name"} placeholder="Full Name" callback = {this.callback}/>          
              <Input id="company" type="text" text={"Company"} placeholder="Company Name" callback = {this.callback}/>
              <Input id="emailaddress" type="text" text={"E-mail"} placeholder="Email" callback = {this.callback}/>
              <Input id="country" type="test" text={"Country"} placeholder="Country" callback = {this.callback}/>
              <Input id="position" type="text" text={"Position"} placeholder="Position" callback = {this.callback}/>
            </div>
              <Div className = "warningText" display = {this.state.warningDisplay} name = {this.state.warningText}/>
              <Button className={ "CB1 popupBtn" } name = "Create contact" click = {this.postRequest }/>
            
        </div>
      </div>
    );
  }
}

export default Form;
