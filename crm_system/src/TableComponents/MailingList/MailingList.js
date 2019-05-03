import React, { Component } from 'react';
import './MailingList.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

class MailingList extends Component{
  render(){
    return(
        <div className="mailing_list">
            <div className= "mailList_section">
                <ul>
                    {this.createList}
                </ul>

            
            
            </div>
            <div className="mailing_info"></div>
        </div>
    ); 
  }
}
export default MailingList;