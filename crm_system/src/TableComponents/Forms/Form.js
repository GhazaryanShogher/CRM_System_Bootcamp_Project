import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Close from '../Close/Close';
import './Form.css';

class Form extends Component {
  state = {
    name:"",
    company:"",
    country:"",
    email:"",
    position:"",
    display:"block"
  }
  postRequest = () => {
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
    })
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
    }
  }

  close = () => {
    this.setState({display:"none"})
  }

// Registration popup
  render() {
    return (
      <div style = {{display:this.state.display}}>
        <div className="form" style={{display:this.props.status}}>
            <Close callback = {this.close} />
            <h1>Create New Contact</h1>
            <div className="inp_edit">
              <Input id="full" type="text" text={"Full Name"} placeholder="Full Name" callback = {this.callback}/>          
              <Input id="company" type="text" text={"Company"} placeholder="Company Name" callback = {this.callback}/>
              <Input id="emailaddress" type="text"  text={"E-mail"}placeholder="Email" callback = {this.callback}/>
              <Input id="country" type="test" text={"Country"} placeholder="Country" callback = {this.callback}/>
              <Input id="position" type="text" text={"Position"} placeholder="Position" callback = {this.callback}/>
            </div>
              <Button className={ "CB1 popupBtn" } name = "Create contact" click = {this.postRequest }/>
            
        </div>
      </div>
    );
  }
}

export default Form;
