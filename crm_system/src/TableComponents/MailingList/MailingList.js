import React, { Component } from 'react';
import './MailingList.css';
import '../tableContent/tableContent.css';
import Div from '../../Div/Div';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import Button from '../Button/Button';

class MailingList extends Component{
  state = {
    mailLists:[],
    status:"none",
    contactsList:"none",
    listOfContacts:[]
  }

  showList = (e) => {    
    fetch(`http://visual.istclabz.com:2112/api/emaillists?id=${e.target.id}`)
    .then((resp) => {return resp.json()})
    .then((results) => { 
    this.setState({listOfContacts: results})
  })  
    .then(() =>this.setState({contactsList: "block"}))

  }

  close = () => {
      this.setState({status:"none"})
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
                <Div className = {"mailList_name"}  name = {v.EmailListName} listId = {v.EmailListID} click = {this.showList}></Div>
                <Div className = {"mailing_list_del"} click = {this.deleteRow}  name = {<Icon  className={"fa fa-trash" } id = {v.EmailListID}></Icon>} ></Div>    
                <Div className = {"mailing_list_arr}"} name = {<Icon  className={"fa fa-chevron-right" }></Icon>} id = {v.EmailListID}></Div>
          </div>
         )}           
                
            </div>
            <div className="form" style={{display:this.state.status}}>
                <h3>{this.state.text} </h3>
                <Button className={"CB1 popupBtn"} click={this.deleteList} name = "Delete"/>
                <Button className={"CB1 popupBtn"} click={this.close} name = "Cancel"/>
            </div>
            <div style={{display:this.state.contactsList}} className="mailing_info">
            <div className="table_box">

              {/* <div>{this.props.counter}</div>
              <button onClick = {this.props.get}>show</button>
              <button onClick = {this.props.del}>delete</button> */}
            
              <div >
                <div className="table_header">
                    <div className="header_btn1">Select</div>
                    <div className="header_name">Full Name</div>
                    <div className="header_name">Company Name</div>
                    <div className="header_name" >Position</div>
                    <div className="header_name">Counrty</div>
                    <div className="header_name">Email</div>
                    <div className="header_btn1">Edit</div>
                    <div className="header_btn1">Delete</div>
                </div>
              </div>
              </div>
            <div className="overflow_div">
            {this.state.listOfContacts.Contacts.map((v,i) => {
            
          <div className="tbl_content">
            <div  className="checkbox"><Input class="check" val={v.GuID} type = "checkbox"/></div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v["Full Name"]}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v["Company Name"]}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v.Position}</div>
            <div  className="td_style" style={{contenteditable:this.state.editTd}}>{v.Country}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v.Email}</div>
            <div  className="editbox" id = {v.GuID}><Icon  className="fa fa-cogs" aria-hidden="true" id = {v.GuID} ></Icon></div>
            <div  className="editbox" id = {v.GuID}><Icon  className="fa fa-trash" aria-hidden="true" id = {v.GuID} ></Icon></div>    
          </div>
            }
      
        )}   
      </div>   
            </div>
        </div>
    ); 
  }
}
export default MailingList;