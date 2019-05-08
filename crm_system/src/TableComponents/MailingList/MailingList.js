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
                {this.state.mailLists.map((v,i) =>
            <div >
            <div className= "mailList_name" style={{contenteditable:this.state.editTd}}>{v.EmailListName}</div>
            <div className="mailing_list_del" onClick = {this.deleteRow} id = {v.GuID}><Icon  className={"fa fa-trash" } id = {v.GuID} ></Icon></div>    
            <div  className="mailing_list_arr" id = {v.GuID}><Icon  className={"fa fa-chevron-right" }id = {v.GuID} ></Icon></div>
          </div>
         )}           
                 
            </div>
            <div className="mailing_info"></div>
        </div>
    ); 
  }
}
export default MailingList;