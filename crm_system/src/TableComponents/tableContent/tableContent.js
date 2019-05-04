import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions';
import {bindActionCreators} from 'redux';
import './tableContent.css';
import Icon from '../Icon/Icon';
import Close from '../Close/Close';
import SelectTemplate from '../Header/selectTemplate/selectTemplate';
import Button from '../Button/Button';
import Form from '../Forms/Form';
import Input from '../Input/Input';
import '../Forms/Form';
//import HeaderButton from '../HeaderButton/HeaderButton';
//import Menu from '../menu/menu';
//import MailingListPopup from '../MailingList/MailingListPopup';

class TableContent extends Component{
  constructor(props){
    super(props);
  this.state = {
        data: [],
        del:[],
        GuID:"",
        name:"",
        company:"",
        country:"",
        email:"",
        position:"",
        templateId:"",
        disabled:true,
        checked:"",
        disabled:true,
        status: "none",
        status1: "none",
        status2: "none",
        func:"",
        text: "",
        delete: "",
        };
      }

      close = () => {
        if(this.state.status1 === "block"){
          this.setState({status1:"none"})
        }
        if (this.state.status2 === "block") {
          this.setState({status2: "none"})
        }
      }
      addContact = ()=>{
          this.setState({status: "block"})
      }

  componentDidMount(){  
    fetch('http://visual.istclabz.com:2112/api/contacts')
      .then((resp) => {return resp.json()})
      .then((results) => { 
      this.setState({data: results})
    })
  }  

  
  handleClick = (e) => { this.setState({status1: "block"}) }

  //get template id
  templateId = (e)=>{ this.setState({templateId: e.target.value}) }

  //select rows
  checked = (e) =>{
    if(e.target.checked){

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
   deleteRow = (e)=>{
    e.target.id === "delete" ? this.setState({ text: "Delete All Selected Contacts?",func: this.deleteContacts}) : this.setState({ text:"Delete Contact?", func: this.deleteContact});
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
    fetch('http://visual.istclabz.com:2112/api/contacts',{
      method: 'DELETE',
      body: JSON.stringify(
        this.state.del
      ),
      headers: {
       "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(()=>{this.setState({del: []})})
  }

  //update contact
  updateContact = ()=>{
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
              <div className="btnBox">
                <Form status = {this.state.status}/>
                        {/* <SelectTemplate/> */}
                        <select onChange = {this.templateId}>
                    <option value="0" onChange = {this.templateId}>Select a Template</option>
                    <option value="1" onChange = {this.templateId}>Anniversary</option>
                    <option value="2" onChange = {this.templateId}>Birthday</option>
                    <option value="3" onChange = {this.templateId}>Christmas</option>
                </select>
                    
                        <Button  name={"Send Email"} className= "CB1" click ={this.sendEmail} disabled={this.state.disabled}>
                            <i className="fa fa-envelope" aria-hidden="true"></i><br />Send Email
                        </Button>
                    
                    
                    <Button name={"Add to Mail List"}  className= "CB1" disabled={this.state.disabled}>
                    <i className="fa fa-folder-open" aria-hidden="true"></i>
                    </Button>
                    
                    

                    <Button  name={"Delete Selected"} id={"delete"}  className= "CB1" click={this.deleteRow} disabled={this.state.disabled}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i><br />Delete Selected
                    </Button>

                    <Button name={"Add to Contact"}  className= "CB1" click = {this.addContact}>
                    <i className="fa fa-user-plus" aria-hidden="true"></i><br />Add Contact
                    </Button>

                    <Button name={"Create Mailing List"}  className= "CB1">
                    <i className="fa fa-list-alt" aria-hidden="true"></i><br />Create Mailing list
                    </Button>

                    <Button name={"Upload"} className= "CB1" >
                    <i className="fa fa-cloud-upload" aria-hidden="true"></i><br />Upload
                    </Button>
                </div>
           
            
              <div className="table_box">
              <div>{this.props.counter}</div>
              <button onClick = {this.props.get}>show</button>
              <button onClick = {this.props.del}>delete</button>
              <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Full Name</th>
                    <th>Company Name</th>
                    <th>Position</th>
                    <th>Counrty</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            
            {this.state.data.map((v,i) =>
          
          <tr>
            <td onClick = {this.checked} className="checkbox"><Input val={v.GuID} type = "checkbox"/></td>
            <td style={{contenteditable:this.state.editTd}}>{v["Full Name"]}</td>
            <td style={{contenteditable:this.state.editTd}}>{v["Company Name"]}</td>
            <td style={{contenteditable:this.state.editTd}}>{v.Position}</td>
            <td style={{contenteditable:this.state.editTd}}>{v.Country}</td>
            <td style={{contenteditable:this.state.editTd}}>{v.Email}</td>
            <td onClick = {this.editContact} className="editbox" id = {v.GuID}><Icon  className="fa fa-cogs" aria-hidden="true" id = {v.GuID} ></Icon></td>
            <td onClick = {this.deleteRow} className="editbox" id = {v.GuID}><Icon  className="fa fa-trash" aria-hidden="true" id = {v.GuID} ></Icon></td>    
          </tr>
      
        )
      }           
            </tbody>
        </table>

      </div>        
                {/* <Edit status1={this.state.status1} /> */}
                {/* <MailingListPopup/> */}
     
      <div className="form" style={{display:this.state.status1}}>
        <Close callback = {this.close} />
        <h1>Edit Contacts</h1>


        <Input id="full" type="text" placeholder="Full Name" val = {this.state.name} callback = {this.callback}/>          
        <Input id="company" type="text" placeholder="Company Name" val = {this.state.company} callback = {this.callback}/>
        <Input id="emailaddress" type="text" placeholder="Email" val = {this.state.email} callback = {this.callback}/>
        <Input id="country" type="test" placeholder="Country" val = {this.state.country} callback = {this.callback}/>
        <Input id="position" type="text" placeholder="Position" val = {this.state.position} callback = {this.callback}/>
        <Button className= {"CB1 popupBtn"} click = {this.updateContact} name = "Save"/>

   </div>  
      <div className="form" style={{display:this.state.status2}}>
        <h3>{this.state.text} </h3>
        <Button className={"CB1 popupBtn"} click={this.state.func} name = "Delete"/>
        <Button className={"CB1 popupBtn"} click={this.close} name = "Cancel"/>
      </div>

                {/* <Edit status1={this.state.status1} /> */}

            </Fragment>
        );
    }
}
const mapStateToprops = (state) => {
  
  return {
    counter:state.result
  }
}
const mapDispatchToProps = (dispatch) => {
  const {get,del} = bindActionCreators(actions,dispatch);
  return{
    get,del 
  }
}
export default connect (mapStateToprops, mapDispatchToProps)(TableContent);