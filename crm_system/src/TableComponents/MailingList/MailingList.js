import React, { Component } from 'react';
import './MailingList.css';
import '../tableContent/tableContent.css';
import Div from '../../Div/Div';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Overlay from "../Overlay/overlay";

class MailingList extends Component{
  state = {
    mailLists:[],
    status:"none",
    statusPopup:"none",
    listOfContacts:"",
    template: "",
    emailId: "",
    contactsList:"none",
    listId: 0,
    status3: "none",
    delivery: "",
    overStatus: "none",
    warningDisplay: "none",
    warningText: "",
    animation1: "none",
    animation2: "none",
    animation3: "none",
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
      this.setState({statusPopup:"none", template: "", warningDisplay: "none", warningText: "", animation1: "none", animation2: "none", animation3: "none"}) 
    }
}

  // Send Email
  popup = (e) => {
    this.setState({statusPopup:"block", emailId: e.target.id})
  }

//get template id during click
  templateClick = (e) => {
    switch (e.target.id) {
      case "1":
        this.setState({template: e.target.id, animation1: "glow 1.4s infinite alternate", animation2: "none", animation3: "none", warningDisplay: "none", warningText: ""})
        break;
      case "2":
        this.setState({template: e.target.id, animation2: "glow 1.4s infinite alternate", animation1: "none", animation3: "none", warningDisplay: "none", warningText: ""})
        break;
      case "3":
        this.setState({template: e.target.id, animation3: "glow 1.4s infinite alternate", animation1: "none", animation2: "none", warningDisplay: "none", warningText: ""})
        break;
      default:
        break
    }
  }
  

  //send email to 
  sendEmail = () => {
    if (this.state.template) {
      this.setState({statusPopup: "none", status3: "block", overStatus: "block"})
      fetch(`http://visual.istclabz.com:2112/api/sendemails?template=${this.state.template}&emaillistId=${this.state.emailId}`, {
        method: 'Post',
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(() => this.setState({emailId:"", template:"", delivery: "Email has been sent", overStatus: "none", warningDisplay: "none", warningText: "", animation1: "none", animation2: "none", animation3: "none"}))
      .then(() =>{setTimeout(()=> {this.setState({delivery: "", status3: "none",})}, 2000)})
    }
    else this.setState({warningDisplay: "block", warningText: "Please Select Template"})
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
  componentWillUnmount() {
    this.setState({mailLists: []})
  }
  render(){
    return(
        <div className="mailing_list">
            <div className= "mailList_section">
                {this.state.mailLists.map((v,i) => 
            <div key={i}>
                <Div className = {"mailList_name"}  name = {v.EmailListName} listId = {v.EmailListID} click = {this.showList}></Div>
                <Div className = {"mailing_list_del"} click = {this.deleteRow}  name = {<Icon  className={"fa fa-trash" } id = {v.EmailListID}></Icon>} ></Div>    
                <Div  className = {"mailing_list_arr"} click = {this.popup} name = {<Icon click = {this.popup} className={"fa fa-envelope-open-o"} id = {v.EmailListID}></Icon>} listId = {v.EmailListID}></Div>

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
                <div onClick={this.templateClick} id = "1"><Icon click={this.templateClick} className={"fa fa-gift"}  id = "1"/><span style = {{animation: this.state.animation1}} onClick={this.templateClick} id = "1">Happy Anniaversary!</span></div>               
                <div onClick={this.templateClick} id = "2"><Icon click={this.templateClick} className={"fa fa-birthday-cake"}  id = "2"/><span style = {{animation: this.state.animation2}} onClick={this.templateClick} id = "2">Happy Birthday!</span></div>
                <div onClick={this.templateClick} id = "3"><Icon click={this.templateClick} className={"fa fa-tree"}  id = "3"/><span style = {{animation: this.state.animation3}} onClick={this.templateClick} id = "3">Marry Chtistmas!</span></div>
                <Div className = "warningText" display = {this.state.warningDisplay} name = {this.state.warningText}/>
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
            {/*Loading Popup*/}
          <div className="popup" style={{display:this.state.status3}}>
              <Overlay status = {this.state.overStatus}/>
              <h3 className = "delivery">{this.state.delivery}</h3> 
          </div>
        </div>
    ); 
  }
}
export default MailingList;