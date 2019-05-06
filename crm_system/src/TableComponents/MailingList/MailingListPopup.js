import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './MailingList.css';

class MailingListPopup  extends Component {
    
  render() {
    return (
    <div>
        <div className="form">
            
            <h1>New Mail List</h1>
            <Input id="full" type="text" placeholder="New Mailist" callback = {this.callback}/>          
            
            <Button className= {"CB1 popupBtn"} name = "Create"/>
            <Button className= {"CB1 popupBtn"} name = "Cencel"/>
        </div>
    </div>
    );
  }
}

export default MailingListPopup;