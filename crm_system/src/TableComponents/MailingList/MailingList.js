import React, { Component } from 'react';
import './MailingList.css';
import '../tableContent/tableContent.css';
import Input from '../Input/Input';

import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

class MailingList extends Component{
  state = {
    mailLists:[]
  }

  componentDidMount(){
    fetch('http://visual.istclabz.com:2112/api/emaillists')
        .then((resp) => {return resp.json()})
        .then((results) => {
         this.setState({mailLists: results})
    })
  
  }
  render(){
    return(
        <div className="mailing_list">
            <div className= "mailList_section">
              <table>
                <tbody>
                {this.state.mailLists.map((v,i) =>
          
          <tr >
            {/* <td  className="checkbox"><Input val={v.EmailListID} type = "text"/></td> */}
            <td style={{contenteditable:this.state.editTd}}>{v.EmailListName}</td>
            <td onClick = {this.editContact} className="editbox" id = {v.GuID}><Icon  className={"fas fa-sort-down"} aria-hidden="true" id = {v.GuID} ></Icon></td>
            <td onClick = {this.deleteRow} className="editbox" id = {v.GuID}><Icon  className="fa fa-trash" aria-hidden="true" id = {v.GuID} ></Icon></td>    
          </tr>
        )}           
                </tbody>
              </table>  
            </div>
            <div className="mailing_info"></div>
        </div>
    ); 
  }
}
export default MailingList;