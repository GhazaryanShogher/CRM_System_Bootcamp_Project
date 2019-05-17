import React, { Component, Fragment } from 'react';
// import {connect} from 'react-redux';
// import * as actions from '../../Actions/actions';
// import {bindActionCreators} from 'redux';
import './tableContent.css';
import Icon from '../Icon/Icon';
import Close from '../Close/Close';
import Button from '../Button/Button';
import Form from '../Forms/Form';
import Input from '../Input/Input';
import Div from '../../Div/Div';
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
        disabled:true,
        status: "none",
        status1: "none",
        status2: "none",
        mailList: "none",
        newList:"none",
        func: function() {},
        text: "",
        delete: "",
        loading:true,
    };
    //Closing popup
    close = () => {
        if(this.state.status === "block"){
          this.setState({status:"none"})
        }
        if(this.state.status1 === "block"){
          this.setState({status1:"none"})
        }
        if (this.state.status2 === "block") {
          this.setState({status2: "none"})
        }
        if (this.state.mailList === "block") {
          this.setState({mailList: "none"})
        }
        if (this.state.newList === "block") {
          this.setState({newList: "none"})
        }
    }
    //Create contact popup
     addContact = ()=>{
          this.setState({status: "block"})
      }
      //add contacts to mail list
      createMailListPopup = ()=>{
        this.setState({newList: "block"})
    }

//create new contact
  createMailList = () => {
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
      .then(()=>{this.setState({del: [], newList: "none",createList:""})})
    }

    // get mail list Id
    getListId = (e) => {
      this.setState({listId: e.target.id,listName:e.target.text})
    }

    //add to existing mail list
    updateToMailList = () => {
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

    addtoMailListPopup = () => {
      fetch('http://visual.istclabz.com:2112/api/emaillists')
        .then((resp) => {return resp.json()})
        .then((results) => {
         this.setState({lists: results, mailList: "block"})
    })
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
    //get template id
    templateId = (e) => {this.setState({templateId: e.target.value}) }

    //select rows
    checked = (e) => {
      if (e.target.checked) {
        this.setState({del: this.state.del.concat(e.target.value), disabled: false})
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
      e.target.id === "delete" ? this.setState({text: "Delete All Selected Contacts?", func: this.deleteContacts}) : this.setState({text:"Delete Contact?", func: this.deleteContact});
      this.setState({status2: "block", delete: e.target.id});
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
        GuID:""
      })
    })
    }

//edit contact    
editContact = (e) =>{
  this.setState({status1: "block"});
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
}

// send email
sendEmail = ()=>{
  fetch(`http://visual.istclabz.com:2112/api/sendemails?template=${this.state.templateId}`,{
         method: 'POST',
        body: JSON.stringify(
            this.state.del
        ),
      headers: {
       "Content-type": "application/json; charset=UTF-8"
       }
       })
       .then(()=>{this.setState({del: []})})

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
         this.setState({data: results,})
    })
  
  }

    render() {
        return (
            <Fragment>
              {this.state.loading && <Overlay />}
              <div className="btnBox">
                <Form display = {this.state.status}  close = {this.close}/>
                  <select onChange = {this.templateId}>
                    <option value="0" onChange = {this.templateId}>Select a Template</option>
                    <option value="1" onChange = {this.templateId}>Anniversary</option>
                    <option value="2" onChange = {this.templateId}>Birthday</option>
                    <option value="3" onChange = {this.templateId}>Christmas</option>
                  </select>
                    <Button  name={"Send Email"} className= "CB1" click ={this.sendEmail} disabled={this.state.disabled}></Button>
                    <Button name={"Add to Mail List"} click = {this.addtoMailListPopup} className= "CB1" disabled={this.state.disabled}></Button>
                    <Button  name={"Delete Selected"} id={"delete"}  className= "CB1" click={this.deleteRow} disabled={this.state.disabled}></Button>
                    <Button name={"Add to Contact"}  className= "CB1" click = {this.addContact}></Button>
                    <Button name={"Create Mailing List"}  click = {this.createMailListPopup} className= "CB1"></Button>
                    {/* <Button name={"Upload"} className= "CB1" ></Button> */}
              </div>
          <div className="table_box">

              {/* <div>{this.props.counter}</div>
              <button onClick = {this.props.get}>show</button>
              <button onClick = {this.props.del}>delete</button> */}
            
              <div>
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
       <div className="form" style={{display:this.state.newList}}>
       <Close callback = {this.close} />
       <h1>Create mail list</h1>
       <Input id="mailList" text={"Mail List Name"} type="text" placeholder="Enter mail list name" callback = {this.callback}/>
       <Button className= {"CB1 popupBtn"} click = {this.createMailList} name = {"Create Mail List"}/>
       </div>

      {/*add to existing mailing list popup */}
         <div className="form" style={{display:this.state.mailList}}>
        <Close callback = {this.close} />
        <h1>Add to mail list</h1>      
        <div className="inp_edit">
        {this.state.lists.map((v,i) =>
        <Div key={i} name = {v.EmailListName}  className = {"existing_mailList_name"} listId = {v.EmailListID} click = {this.getListId} text = {v.EmailListName}></Div>
        )}
        <Button className= {"CB1 popupBtn"} click = {this.updateToMailList} name = {"Add To Mail List"}/>
        </div>  
        </div>
        
    {/* Edit Contact */}
     <div className = "popup" style={{display:this.state.status1}}>
      <div className="form" >
        <Close callback = {this.close} />
        <h1>Edit Contacts</h1>
        <div className="inp_edit">
          <Input id="full" type="text" text={"Full Name"} placeholder="Full Name" val = {this.state.name} callback = {this.callback}/>        
          <Input id="company" type="text"  text={"Company"} placeholder="Company Name" val = {this.state.company} callback = {this.callback}/>
          <Input id="emailaddress" type="text" text={"E-mail"} placeholder="Email" val = {this.state.email} callback = {this.callback}/>
          <Input id="country" type="test" text={"Country"} placeholder="Country" val = {this.state.country} callback = {this.callback}/>
          <Input id="position" type="text" text={"Position"} placeholder="Position" val = {this.state.position} callback = {this.callback}/>
          <Button className= {"CB1 popupBtn"} click = {this.updateContact} name = "Save"/>
        </div>
     </div> 
     </div> 
     {/* Delete row */}
     <div className="popup" style={{display:this.state.status2}}>
      <div className="form">
        <h3>{this.state.text} </h3>
        <Button className={"CB1 popupBtn"} click={this.state.func} name = "Delete"/>
        <Button className={"CB1 popupBtn"} click={this.close} name = "Cancel"/>
      </div>
      </div>
  </Fragment>
        );
    }
}
// const mapStateToprops = (state) => {
  
//   return {
//     counter:state.result
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   const {get,del} = bindActionCreators(actions,dispatch);
//   return{
//     get,del 
//   }
// }
// export default connect (mapStateToprops, mapDispatchToProps)(TableContent);
export default TableContent;