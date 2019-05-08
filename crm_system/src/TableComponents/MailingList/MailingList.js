import React, { Component } from 'react';
import './MailingList.css';
import '../tableContent/tableContent.css';
import Input from '../Input/Input';
import Tr from '../../Tr/Tr';
import Icon from '../Icon/Icon';
import Close from '../Close/Close';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

class MailingList extends Component{
  state = {
    mailLists:[],
    listId: "",
    status:"none",
    listOfContacts:[]
  }

  showList = (e) => {
    console.log(e.target)

  }

  close = () => {
      this.setState({status:"none"})
}

  // Delete row
  deleteRow = (e) => {
    this.setState({listId: e.target.id,status:"block"});
  } 

  deleteContact = () => {
    fetch(`http://visual.istclabz.com:2112/api/emaillists?id=${this.state.listId}`,{
      method: 'DELETE',
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(() =>this.setState({status: "none"}))
  }

    componentDidMount(){
    fetch('http://visual.istclabz.com:2112/api/emaillists')
        .then((resp) => {return resp.json()})
        .then((results) => {
         this.setState({mailLists: results})
    })
  
  }
  componentDidUpdate(){
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
            <div className="form" style={{display:this.state.status}}>
                <h3>{this.state.text} </h3>
                <Button className={"CB1 popupBtn"} click={this.deleteContact} name = "Delete"/>
                <Button className={"CB1 popupBtn"} click={this.close} name = "Cancel"/>
            </div>
            <div className="mailing_info"></div>
        </div>
    ); 
  }
}
export default MailingList;