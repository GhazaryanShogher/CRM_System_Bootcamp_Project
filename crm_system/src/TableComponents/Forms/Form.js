import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './Form.css';

class Form extends Component {
  state = {
    name:"",
    company:"",
    country:"",
    email:"",
    position:""
  }
  postRequest = () => {
    return fetch('http://visual.istclabz.com:2112/api/contacts', {
      method: 'POST',
      body: JSON.stringify({
        "Full Name": this.state.name,
        "Company Name": this.state.company,
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
      case "email":
      this.setState({email:e.target.value})
      break;
      case "position":
      this.setState({position:e.target.value})
      break;
    }
  }
// Registration popup
  render() {
    return (
        <div className="form" style={{display:this.props.status}}>
        
        <span className= "close">x</span>
            <h1>Create New Contact</h1>
            <Input id="full" type="text" placeholder="Full Name"/>          
            <Input id="company" type="text" placeholder="Company Name"/>
            <Input id="emailaddress" type="email" placeholder="Email"/>
            <Input id="country" type="password" placeholder="Country"/>
            <Input id="position" type="password" placeholder="Position"/>
            <Button name = "Create contact" click = {this.postRequest }/>
        </div>
    );
  }
}

export default Form;
