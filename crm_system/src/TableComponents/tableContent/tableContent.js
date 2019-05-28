import React, { Component, Fragment } from 'react';
import './tableContent.css';
import Icon from '../Icon/Icon';
import Close from '../Close/Close';
import Button from '../Button/Button';
import Form from '../Forms/Form';
import Input from '../Input/Input';
import Div from '../../Div/Div';
import { FormattedMessage } from "react-intl";
import Overlay  from '../Overlay/overlay';

class TableContent extends Component{
    state = {
        data: [],
        del:[],
        GuID:"",
        name:"",
        company:"",
        country:"",
        email:"",
        position:"",
        addTomailList:"",
        listId:0,
        createList:"",
        lists:[],
        templateId:"",
        listName:"",
        checked:"",
        status: "none",
        status1: "none",
        status2: "none",
        mailList: "none",
        newList:"none",
        func: function() {},
        text: "",
        delete: "",
        loading:true,
        messageEdit: "",
        warningDisplay: "none",
        status3: "none",
        delivery: "",
        overStatus: "none",
        warningText: "",
        statusPopup:"none",        
        animation1: "none",
        animation2: "none",
        animation3: "none",
        template: "",
    };
    //Closing popup
    close = () => {
        if(this.state.status === "block"){
          this.setState({status:"none"})
        }
        if(this.state.status1 === "block"){
          this.setState({
            status1:"none",
            name:"", 
            company:"", 
            country:"",
            position:"",
            email:"",
            GuID:"",
            warningDisplay: "none",
            messageEdit: "",
          })
        }
        if (this.state.status2 === "block") {
          this.setState({status2: "none"})
        }
        if (this.state.mailList === "block") {
          this.setState({mailList: "none"})
        }
        if (this.state.newList === "block") {
          this.setState({newList: "none", warningDisplay: "none", warningText: ""})
        }
        if (this.state.statusPopup === "block") {
          this.setState({statusPopup:"none", template: "", warningDisplay: "none", warningText: "", animation1: "none", animation2: "none", animation3: "none"}) 
        }
    }
    //Create contact popup
     addContact = ()=>{
          this.setState({status: "block"})
      }
      //Create Mail List Popup
      createMailListPopup = () => {
          this.setState({newList: "block"})
    }
    selectTemplate = ()=>{
      if (this.state.del.length > 0) {
        this.setState({statusPopup: "block"})
      }
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

//Create Mail List
  createMailList = () => {
    if (this.state.createList) {
      fetch('http://visual.istclabz.com:2112/api/emaillists',{
        method: 'POST',
        body: JSON.stringify({
          "EmailListName": this.state.createList,
          "Contacts":  this.state.del
        }),
        headers: {
         "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(()=>{this.setState({del: [], newList: "none",createList:"", warningDisplay: "none", warningText: ""})})
    } 
    else this.setState({warningDisplay: "block", warningText: <FormattedMessage id="messageEdit"/>})  
  }

    // get mail list Id
    getListId = (e) => {
      this.setState({listId: e.target.id,listName:e.target.text})
    }

    //add to existing mail list
    updateToMailList = () => {
      if (this.state.listId) {
        fetch(`http://visual.istclabz.com:2112/api/emaillists/update?id=${this.state.listId}&flag=true`,{
        method: 'PUT',
        body: JSON.stringify(
           this.state.del
        ),
        headers: {
         "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(()=>{this.setState({del: [], mailList: "none",})})
      }
    }

    addtoMailListPopup = () => {
      if (this.state.del.length > 0) {
        fetch('http://visual.istclabz.com:2112/api/emaillists')
          .then((resp) => {return resp.json()})
          .then((results) => {
          this.setState({lists: results, mailList: "block"})
        })
      }
    }

  handleClick = (e) => { this.setState({status1: "block"}) }

  //get template id
  templateId = (e)=>{ this.setState({templateId: e.target.value}) }


    componentDidMount(){  
      fetch('http://visual.istclabz.com:2112/api/contacts')
        .then((resp) => {return resp.json()})
        .then((results) => { 
        this.setState({data: results, loading:false})
      })
    }

    //select rows
    checked = (e) => {
      if (e.target.checked) {
        this.setState({del: this.state.del.concat(e.target.value)})
      }
      else {
        let index = this.state.del.indexOf(e.target.value)
        if (index > -1) {
          this.state.del.splice(index, 1)
        }
      }
    }

    // Delete row
    deleteRow = (e) => {
      if (this.state.del.length > 0 && e.target.id === "delete") {
          this.setState({text: <FormattedMessage id="deleteAll"/>, func: this.deleteContacts, status2: "block", delete: e.target.id})
      }
      else if (e.target.id !== "delete") {this.setState({text:<FormattedMessage id="deleteRow"/>, func: this.deleteContact, status2: "block", delete: e.target.id})}
    }

    deleteContact = () => {
      fetch(`http://visual.istclabz.com:2112/api/contacts?guid=${this.state.delete}`,{
        method: 'DELETE',
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(() =>this.setState({status2: "none"}))
    }

    //delete selected contacts
    deleteContacts = () => {
      fetch('http://visual.istclabz.com:2112/api/contacts', {
        method: 'DELETE',
        body: JSON.stringify(
          this.state.del
        ),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(()=>{this.setState({del: [], status2: "none"})})
    }

    //update contact
    updateContact = () => { 
      if (this.state.name && this.state.company && this.state.country && this.state.email && this.state.position) {
        fetch('http://visual.istclabz.com:2112/api/contacts',{
        method: 'PUT',
        body: JSON.stringify({
            "FullName": this.state.name,
            "CompanyName": this.state.company,
            "Position": this.state.position,
            "Country": this.state.country,
            "Email": this.state.email,
            "GuID": this.state.GuID
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
    .then(()=>{
      this.setState({
        status1:"none",
        name:"", 
        company:"", 
        country:"",
        position:"",
        email:"",
        GuID:"",
        warningDisplay: "none",
        messageEdit: "",
      })
    })
      } else this.setState({messageEdit: <FormattedMessage id="messageEdit"/>, warningDisplay: "block"})
    }

//edit contact    
editContact = (e) =>{
  
  fetch(`http://visual.istclabz.com:2112/api/contacts?guid=${e.target.id}`,{
    method: 'GET',
 headers: {
  "Content-type": "application/json; charset=UTF-8"
  }
  })
  .then((resp)=>{return resp.json()})
  .then((result)=>{
    this.setState({
      GuID:result.GuID,
      name:result["Full Name"], 
      company:result["Company Name"], 
      country:result.Country,
      position:result.Position,
      email:result.Email,
    })
})
  .then(()=>this.setState({status1: "block"}));
}

// send email
sendEmail = ()=>{
  if (this.state.template) {
    this.setState({status3: "block", overStatus: "block",  statusPopup: "none"})
      fetch(`http://visual.istclabz.com:2112/api/sendemails?template=${this.state.template}`,{
        method: 'POST',
        body: JSON.stringify(
          this.state.del
        ),
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(()=>{this.setState({del: [], delivery: <FormattedMessage id="emailSent"/>, overStatus: "none", template: "", animation1: "none", animation2: "none", animation3: "none"})})
      .then(() =>{setTimeout(()=> {this.setState({delivery: "", status3: "none"})}, 2000)})
  }
  else this.setState({warningDisplay: "block", warningText: <FormattedMessage id="template"/>})
}

addNewContact = () => {
  let regEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (this.state.company === "" || this.state.country === "" || this.state.name === "" || this.state.position === "") {
    return this.setState({warningDisplay: "block", warningText: <FormattedMessage id="messageEdit"/>})
  } 
  if (regEmail.test(this.state.email) === false) {
    return this.setState({warningDisplay: "block", warningText: <FormattedMessage id="validEmail"/>})
  }
  else {
    this.setState({status: "none"})
    return fetch('http://visual.istclabz.com:2112/api/contacts', {
      method: 'POST',
      body: JSON.stringify({
        "FullName": this.state.name,
        "CompanyName": this.state.company,
        "Position": this.state.position,
        "Country": this.state.country,
        "Email": this.state.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => { return response.json() })
    .then(() => {
      this.setState({
        name: "",
        email: "",
        company: "",
        country: "",
        position: "",
        warningDisplay: "none",
        warningText: "",
      })
    })
  }
}

callback = (e) => {
  switch(e.target.id){
    case "full":
    this.setState({name:e.target.value})
    break;
    case "company":
    this.setState({company:e.target.value})
    break;
    case "country":
    this.setState({country:e.target.value})
    break;
    case "emailaddress":
    this.setState({email:e.target.value})
    break;
    case "position":
    this.setState({position:e.target.value})
    break;
    case "mailList":
    this.setState({createList:e.target.value})
    break;
    default: 
    break;
  }
}

   componentDidUpdate(){
    fetch('http://visual.istclabz.com:2112/api/contacts')
        .then((resp) => {return resp.json()})
        .then((results) => {
         this.setState({data: results})
    })
  
  }
  
    render() {
        return (
            <Fragment>
              {this.state.loading && <Overlay />}
              <div className="btnBox">{/* Choose template */}
                    <Button  name={<FormattedMessage id="selectTemplate"/>} className= "CB1" click ={this.selectTemplate}></Button>
                    <Button name={<FormattedMessage id="addToMailList"/>} click = {this.addtoMailListPopup} className= "CB1" ></Button>
                    <Button  name={<FormattedMessage id="button.delete"/>} id={"delete"}  className= "CB1" click={this.deleteRow}></Button>
                    <Button name={<FormattedMessage id="addContact"/>}  className= "CB1" click = {this.addContact}></Button>
                    <Button name={<FormattedMessage id="createMailingList"/>}  click = {this.createMailListPopup} className= "CB1"></Button>
                    {/* <button className= "CB1" onClick = {()=>this.props.setLocale('en')}>EN</button>
                    <button className= "CB1" onClick = {()=>this.props.setLocale('am')}>AM</button> */}
                    {/* <Button name={"Upload"} className= "CB1" ></Button> */}
              </div>
          <div className="table_box">
              <div>
                <div className="table_header">
                    <div className="header_btn1">{<FormattedMessage id="select"/>}</div>
                    <div className="header_name">{<FormattedMessage id="fullName"/>}</div>
                    <div className="header_name">{<FormattedMessage id="company"/>}</div>
                    <div className="header_name">{<FormattedMessage id="position"/>}</div>
                    <div className="header_name">{<FormattedMessage id="counrty"/>}</div>
                    <div className="header_name">{<FormattedMessage id="email"/>}</div>
                    <div className="header_btn1">{<FormattedMessage id="edit"/>}</div>
                    <div className="header_btn1">{<FormattedMessage id="delete"/>}</div>
                </div>
              </div>
              </div>
            <div className="overflow_div">
            {this.state.data.map((v,i) =>
            
          <div className="tbl_content" key={i}>
            <div onClick = {this.checked} className="checkbox"><Input class="check" val={v.GuID} type = "checkbox"/></div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v["Full Name"]}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v["Company Name"]}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v.Position}</div>
            <div  className="td_style" style={{contenteditable:this.state.editTd}}>{v.Country}</div>
            <div className="td_style" style={{contenteditable:this.state.editTd}}>{v.Email}</div>
            <div onClick = {this.editContact} className="editbox" id = {v.GuID}><Icon  className="fa fa-cogs" aria-hidden="true" id = {v.GuID} ></Icon></div>
            <div onClick = {this.deleteRow} className="editbox" id = {v.GuID}><Icon  className="fa fa-trash" aria-hidden="true" id = {v.GuID} ></Icon></div>    
          </div>
      
        )
      }   
      </div>   
       {/* create mailing list popup     */}
       <div className = "popup"style={{display:this.state.newList}}>
       <div className="form" >
       <Close callback = {this.close} />
       <h2><FormattedMessage id="createMailingList"/></h2>
       <Input id="mailList" text={<FormattedMessage id="mailListName"/>} type="text" placeholder="Enter mail list name" callback = {this.callback} val = {this.state.createList}/>
       <Div className = "warningText" display = {this.state.warningDisplay} name = {this.state.warningText}/>
       <Button className= {"CB1 popupBtn"} click = {this.createMailList} name = {<FormattedMessage id="createMailingList"/>}/>
       </div>
       </div>
      {/*add to existing mailing list popup */}
      <div className = "popup"style={{display:this.state.mailList}}>
         <div className="form" >
        <Close callback = {this.close} />
        <h2><FormattedMessage id="addToMailList"/></h2>      
        <div className="inp_edit">
        {this.state.lists.map((v,i) => {
        return <Div key={i} name = {v.EmailListName} className = {"existing_mailList_name"} listId = {v.EmailListID} click = {this.getListId} text = {v.EmailListName}></Div>
        })}
        <Button className= {"CB1 popupBtn"} click = {this.updateToMailList} name = {<FormattedMessage id="addToMailList"/>}/>
        </div>  
        </div>
        </div>
    {/* Edit Contact */}
     <div className = "popup" style={{display:this.state.status1}}>
      <div className="form" >
        <Close callback = {this.close} />
        <h2><FormattedMessage id="editContact"/></h2>
        <div className="inp_edit">
          <Input id="full" type="text" text={<FormattedMessage id="fullName"/>} placeholder={"Full Name"} val = {this.state.name} callback = {this.callback}/>        
          <Input id="company" type="text"  text={<FormattedMessage id="company"/>} placeholder="Company Name" val = {this.state.company} callback = {this.callback}/>
          <Input id="emailaddress" type="text" text={<FormattedMessage id="email"/>} placeholder="Email" val = {this.state.email} callback = {this.callback}/>
          <Input id="country" type="test" text={<FormattedMessage id="counrty"/>} placeholder="Country" val = {this.state.country} callback = {this.callback}/>
          <Input id="position" type="text" text={<FormattedMessage id="position"/>} placeholder="Position" val = {this.state.position} callback = {this.callback}/>
          <Div className = "warningText" display = {this.state.warningDisplay} name = {this.state.messageEdit}/>
          <Button className= {"CB1 popupBtn"} click = {this.updateContact} name = {<FormattedMessage id="save"/>}/>
        </div>
     </div> 
     </div> 
     {/* Delete row */}
     <div className="popup" style={{display:this.state.status2}}>
      <div className="form">
        <h3>{this.state.text} </h3>
        <Button className={"CB1 popupBtn1"} click={this.state.func} name = {<FormattedMessage id="delete"/>}/>
        <Button className={"CB1 popupBtn1"} click={this.close} name = {<FormattedMessage id="cancel"/>}/>
      </div>
      </div>

      {/*Loading Popup*/}
      <div className="popup" style={{display:this.state.status3}}>
          <Overlay status = {this.state.overStatus}/>
          <h3 className = "delivery">{this.state.delivery}</h3> 
      </div>
      {/* {add new contact} */}
    <div className="popup" style={{display:this.state.status}}>
      <Form  close = {this.close} click = {this.addNewContact} callback={this.callback} warningDisplay = {this.state.warningDisplay} warningText = {this.state.warningText} name = {this.state.name} company = {this.state.company} emailaddress = {this.state.email} country = {this.state.country} position = {this.state.position}/>
      </div>
      {/* Select template  */}
      <div className="popup" style={{display:this.state.statusPopup}}>
          <div className="form">
            <h3><FormattedMessage id="selectTemplate"/></h3>
            <div className="event" style = {{animation: this.state.animation1}} onClick={this.templateClick} id = "1"><Icon click={this.templateClick} className={"fa fa-gift"}  id = "1"/><span onClick={this.templateClick} id = "1"><FormattedMessage id="happyA"/></span></div>               
            <div className="event" style = {{animation: this.state.animation2}} onClick={this.templateClick} id = "2"><Icon click={this.templateClick} className={"fa fa-birthday-cake"}  id = "2"/><span onClick={this.templateClick} id = "2"><FormattedMessage id="happyBD"/></span></div>
            <div className="event" style = {{animation: this.state.animation3}} onClick={this.templateClick} id = "3"><Icon click={this.templateClick} className={"fa fa-tree"}  id = "3"/><span onClick={this.templateClick} id = "3"><FormattedMessage id="marryChristmas"/></span></div>
            <Div className = "warningText" display = {this.state.warningDisplay} name = {this.state.warningText}/>
            <Button className={"CB1 popupBtn1"} click={this.sendEmail} name = {<FormattedMessage id="sendEmail"/>}/>
            <Button className={"CB1 popupBtn1"} click={this.close} name = {<FormattedMessage id="cancel"/>}/>
          </div>
      </div>
  </Fragment>
        );
    }
}

export default TableContent;