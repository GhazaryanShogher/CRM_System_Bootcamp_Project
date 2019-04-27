import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Close from '../Close/Close';
import './Edit.css';

class Edit extends Component {
    state = {
        visibility: "show"

    }

    callback = () => this.props.callback;
    close = () => {
        
        this.setState({visibility:"hidden"})
      }

// Edit popup
  render() {
    return (
        <div className="form" style={{display:this.props.status, visibility: this.state.visibility}}>
            <Close callback = {this.close} />
            <h1>Edit Contacts</h1>
            <Input id="full" type="text" placeholder="Full Name" callback = {this.callback}/>          
            <Input id="company" type="text" placeholder="Company Name" callback = {this.callback}/>
            <Input id="emailaddress" type="text" placeholder="Email" callback = {this.callback}/>
            <Input id="country" type="test" placeholder="Country" callback = {this.callback}/>
            <Input id="position" type="text" placeholder="Position" callback = {this.callback}/>
            <Button className= {"CB1 popupBtn"} name = "Save"/>
            <Button className= {"CB1 popupBtn"} name = "Cencel"/>
        </div>
    );
  }
}

export default Edit;