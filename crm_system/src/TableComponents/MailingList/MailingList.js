import React, { Component } from 'react';
import './MailingList.css';
import '../tableContent/tableContent.css';
import Input from '../Input/Input';
import Div from '../../Div/Div';
import Icon from '../Icon/Icon';
import Close from '../Close/Close';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

class MailingList extends Component{
  state = {
    mailLists:[],
    listId: "",
    status:"none",
    statusPopup:"none",
    listOfContacts:[],
    template: "",
    emailId: "",
  }

  showList = (e) => {
    this.setState({listId:""})
    
    fetch(`http://visual.istclabz.com:2112/api/emaillists?id=${this.state.listId}`,{
      method: 'GET',
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(() =>this.setState({status: "none",listId:""}))

  }

  close = () => {
    if (this.state.status === "block") {
      this.setState({status:"none"})
    }
    if (this.state.statusPopup === "block") {
      this.setState({statusPopup:"none"}) 
      console.log(this.state.emailId)
    }
      
}
  // Send Email
  popup = (e) => {
    this.setState({statusPopup:"block", emailId:e.target.id})
  }
  templateClick = (e) => {
    this.setState({template:e.target.id})
  }
  sendEmail = () => {
    fetch(`http://visual.istclabz.com:2112/api/sendemails?template=${this.state.template}&emaillistId=${this.state.emailId}`, {
      method: 'Post',
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(() => this.setState({statusPopup: "none", emailId:"", template:""}))
    .then(() => console.log(this.state.statusPopup))
  }
  
  // Delete row
  deleteRow = (e) => {
    this.setState({listId: e.target.id,status:"block"});
  } 

  deleteList = () => {
    fetch(`http://visual.istclabz.com:2112/api/emaillists?id=${this.state.listId}`,{
      method: 'DELETE',
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(() =>this.setState({status: "none",listId:""}))
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
                <Div className = {"mailList_name"}  name = {v.EmailListName} id = {v.EmailListID} click = {this.showList}></Div>
                <Div className = {"mailing_list_del"} click = {this.deleteRow}  name = {<Icon  className={"fa fa-trash" } id = {v.EmailListID}></Icon>} ></Div>    
                <Div  className = {"mailing_list_arr}"} click = {this.popup} name = {<Icon  className={"fa fa-chevron-right" }></Icon>} id = {v.EmailListID}></Div>
          </div>
         )}           
                
            </div>
            <div className="form" style={{display:this.state.status}}>
                <h3>{this.state.text} </h3>
                <Button className={"CB1 popupBtn"} click={this.deleteList} name = "Delete"/>
                <Button className={"CB1 popupBtn"} click={this.close} name = "Cancel"/>
            </div>
            <div className="mailing_info"></div>
            <div className="popup" style={{display:this.state.statusPopup}}>
              <div className="form">
                <h3>Choose Template</h3>
                <Button className={"CB1 popupBtn"} click={this.templateClick} id ={"1"} name = {"Anniversary"}/>
                <Button className={"CB1 popupBtn"} click={this.templateClick} id ={"2"} name = {"Birthday"}/>
                <Button className={"CB1 popupBtn"} click={this.templateClick} id ={"3"} name = {"Christmas"}/>
                <Button className={"CB1 popupBtn"} click={this.sendEmail} name = "Send Email"/>
                <Button className={"CB1 popupBtn"} click={this.close} name = "Cancel"/>
              </div>
            </div>
        </div>
    ); 
  }
}
export default MailingList;