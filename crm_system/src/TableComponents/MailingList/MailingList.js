import React, { Component } from 'react';
import './MailingList.css';
import '../tableContent/tableContent.css';
import Div from '../../Div/Div';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

class MailingList extends Component{
  state = {
    mailLists:[],
    status:"none",
    statusPopup:"none",
    listOfContacts:"",
    template: "",
    emailId: "",
    contactsList:"none",
    listId: 0
  }

  //remove from existing mail list
  removeFromMailList = (e) => {
    fetch(`http://visual.istclabz.com:2112/api/emaillists/update?id=${this.state.listId}&flag=false`,{
      method: 'PUT',
      body: JSON.stringify([`${e.target.id}`]        
      ),
      headers: {
       "Content-type": "application/json; charset=UTF-8"
      }
    })
  }


  // showing list's contacts 
  showList = (e) => {
    this.setState({listId: e.target.id})
    
    fetch(`http://visual.istclabz.com:2112/api/emaillists?id=${e.target.id}`)
    .then((resp) => {return resp.json()})
    .then((results) => { 
    this.setState({listOfContacts: results})
  })
    .then(() =>this.setState({contactsList: "block"}))
  }  

// close icon or cancel
  close = () => {
    if (this.state.status === "block") {
      this.setState({status:"none"})
    }
    if (this.state.statusPopup === "block") {
      this.setState({statusPopup:"none"}) 
    }      
}

  // Send Email
  popup = (e) => {
    this.setState({statusPopup:"block", emailId: e.target.id})
    console.log(e.target.id)
  }

//get template id during click
  templateClick = (e) => {
    this.setState({template: e.target.id})
  }

  //send email to 
  sendEmail = () => {
    fetch(`http://visual.istclabz.com:2112/api/sendemails?template=${this.state.template}&emaillistId=${this.state.emailId}`, {
      method: 'Post',
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(() => this.setState({emailId:"", template:""}))
    this.setState({statusPopup: "none"})
  }
  
  // Delete row
  deleteRow = (e) => {
    this.setState({listId: e.target.id,status:"block"});
  } 

  //Delete mailing list
  deleteList = () => {
    fetch(`http://visual.istclabz.com:2112/api/emaillists?id=${this.state.listId}`,{
      method: 'DELETE',
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(() =>this.setState({status: "none", listId:"", contactsList:"none"}))
  }

  // get email lists and show in page
    componentDidMount(){
    fetch('http://visual.istclabz.com:2112/api/emaillists')
        .then((resp) => {return resp.json()})
        .then((results) => {
         this.setState({mailLists: results})
    })
  
  }
  
  //refreshing after delete or add
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
            <div key={i}>
                <Div className = {"mailList_name"}  name = {v.EmailListName} listId = {v.EmailListID} click = {this.showList}></Div>
                <Div className = {"mailing_list_del"} click = {this.deleteRow}  name = {<Icon  className={"fa fa-trash" } id = {v.EmailListID}></Icon>} ></Div>    
                <Div  className = {"mailing_list_arr"} click = {this.popup} name = {<Icon  className={"fa fa-envelope-open-o" }></Icon>} listId = {v.EmailListID}></Div>

          </div>
         )}           
                
            </div>
            {/* Delete mailing list popup */}
            <div className="form" style={{display:this.state.status}}>
                <h3>Delete Mailing List?</h3>
                <Button className={"CB1 popupBtn"} click={this.deleteList} name = "Delete"/>
                <Button className={"CB1 popupBtn"} click={this.close} name = "Cancel"/>
            </div>

           {/* Choose template */}
            <div className="popup" style={{display:this.state.statusPopup}}>
              <div className="form">
                <h3>Choose Template</h3>
                <div onClick={this.templateClick}><Icon className={"fa fa-gift"}  id ={"1"}/><span>Happy Anniaversary!</span></div>               
                <div onClick={this.templateClick} > <Icon className={"fa fa-birthday-cake"}  id ={"2"}/><span>Happy Birthday!</span></div>
                <div onClick={this.templateClick}><Icon className={"fa fa-tree"}  id ={"3"}/><span>Marry Chtistmas!</span></div>
                <Button className={"CB1 popupBtn"} click={this.sendEmail} name = "Send Email"/>
                <Button className={"CB1 popupBtn"} click={this.close} name = "Cancel"/>
              </div>
                </div>
            <div style={{display:this.state.contactsList}} className="mailing_info">
            <div className="table_box">

              <div >
                <div className="table_header">
                    <div className="header_name">Full Name</div>
                    <div className="header_name">Company Name</div>
                    <div className="header_name">Position</div>
                    <div className="header_name">Counrty</div>
                    <div className="header_name">Email</div>
                    <div className="header_btn1">Delete</div>
                </div>
              </div>
              </div>
            <div className="overflow_div">
            {this.state.listOfContacts !== "" ? this.state.listOfContacts.Contacts.map((v,i) => {
            
          return <div className="tbl_content" key={i}>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v["Full Name"]}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v["Company Name"]}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v.Position}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v.Country}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v.Email}</div>
            <div className="del_icon" onClick = {this.removeFromMailList}><Icon  className="fa fa-trash" aria-hidden="true" id = {v.GuID} ></Icon></div>    
          </div>
            }
      
        ): null }   
      </div>   

            </div>
        </div>
    ); 
  }
}
export default MailingList;