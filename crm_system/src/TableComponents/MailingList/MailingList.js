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
              <table>
                <tbody>
                {this.state.mailLists.map((v,i) =>
          <tr id = {v.EmailListID} click = {this.showList}>
            <td style={{contenteditable:this.state.editTd}}>{v.EmailListName}</td>
            <td onClick = {this.editContact} className="editbox" ><Icon  className={"fas fa-sort-down"} aria-hidden="true" id = {v.EmailListID}></Icon></td>
            <td onClick = {this.deleteRow} className="editbox" ><Icon  className="fa fa-trash" aria-hidden="true" id = {v.EmailListID} ></Icon></td>    
          </tr>
        )}           
                </tbody>
              </table>  
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