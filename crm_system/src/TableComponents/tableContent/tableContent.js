import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions';
import {bindActionCreators} from 'redux';
import './tableContent.css';
import Edit from '../Edit/Edit';
import Icon from '../Icon/Icon';
import Close from '../Close/Close';
import SelectTemplate from '../Header/selectTemplate/selectTemplate';
import Button from '../Button/Button';
import Form from '../Forms/Form';
import Input from '../Input/Input';
import MailingListPopup from '../MailingList/MailingListPopup';

class TableContent extends Component{
  constructor(props){
    super(props);
  this.state = {
        data: [],
        del:[],
        edit:[],
        name:"",
        company:"",
        country:"",
        email:"",
        position:"",
        checked:"",
        disabled:true,
        status: "none",
        status1: "none"
        };
      }

      close = () => {
        this.setState({status1:"none"})
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

  
  handleClick = (e) => {
    this.setState({status1: "block"});
  }

  checked = (e) =>{
    if(e.target.checked){
      this.setState({del: this.state.del.concat(e.target.value),disabled:false})
      
    }
  }

  // Delete row
   deleteRow = (e)=>{
      fetch(`http://visual.istclabz.com:2112/api/contacts?guid=${e.target.id}`,{
        method: 'DELETE',
     headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
      })
    } 
  

//delete selected contacts
  deleteContacts = () =>{
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
  .then((result)=>{this.setState({edit:result})
})
}

callback = (e) => {
  // switch(e.target.id){
  //   case "full":
  //   this.setState({edit["Full Name"]:e.target.value})
  //   break;
  //   case "company":
  //   this.setState({company:e.target.value})
  //   break;
  //   case "country":
  //   this.setState({country:e.target.value})
  //   break;
  //   case "emailaddress":
  //   this.setState({email:e.target.value})
  //   break;
  //   case "position":
  //   this.setState({position:e.target.value})
  //   break;
  //}
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
                        <SelectTemplate/>
                    
                        <Button  name={"Send Email"} disabled = {this.state.disabled} className= "CB1">
                            <i className="fa fa-envelope" aria-hidden="true"></i><br />Send Email
                        </Button>
                    
                    
                    <Button name={"Add to Mail List"} disabled = {this.state.disabled} className= "CB1">
                    <i className="fa fa-folder-open" aria-hidden="true"></i>
                    </Button>
                    
                    
                    <Button  name={"Delete Selected"} id={"delete"} disabled = {this.state.disabled} className= "CB1" click={this.deleteContacts}>
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
              {/* <HeaderButton/> */}
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
        <Input id="full" type="text" placeholder="Full Name"  val = {this.state.edit["Full Name"]} callback = {this.callback}/>          
        <Input id="company" type="text" placeholder="Company Name" val = {this.state.edit["Company Name"]} />
        <Input id="emailaddress" type="text" placeholder="Email" val = {this.state.edit.Email}/>
        <Input id="country" type="test" placeholder="Country" val = {this.state.edit.Country}/>
        <Input id="position" type="text" placeholder="Position" val = {this.state.edit.Position}/>
        <Button className= {"CB1 popupBtn"} name = "Save"/>
        <Button className= {"CB1 popupBtn"} name = "Cencel"/>
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