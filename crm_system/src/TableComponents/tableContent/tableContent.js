import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions';
import {bindActionCreators} from 'redux';
import './tableContent.css';
import Edit from '../Edit/Edit';
import Icon from '../Icon/Icon';
import SelectTemplate from '../Header/selectTemplate/selectTemplate';
import Button from '../Button/Button';
import Form from '../Forms/Form';
import Input from '../Input/Input';
import MailingListPopup from '../MailingList/MailingListPopup';
//import Menu from '../menu/menu';


class TableContent extends Component{
  constructor(props){
    super(props);
  this.state = {
        data: [],
        del:[],
        checked:"",
        status: "none",
        status1: "none"
        };
      //this.handleClick = 
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
    console.log(e.target.id)
  }

  checked = (e) =>{
    if(e.target.checked){
      this.setState({del: this.state.del.concat(e.target.value)})
      
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
                    
                        <Button  name={"Send Email"} className= "CB1">
                            <i className="fa fa-envelope" aria-hidden="true"></i><br />Send Email
                        </Button>
                    
                    
                    <Button name={"Add to Mail List"}  className= "CB1">
                    <i className="fa fa-folder-open" aria-hidden="true"></i>
                    </Button>
                    
                    
                    <Button  name={"Delete Selected"} id={"delete"}  className= "CB1" click={this.deleteContacts}>
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
            <td onClick = {this.handleClick} className="editbox" id = {v.GuID}><Icon  className="fa fa-cogs" aria-hidden="true" id = {v.GuID} ></Icon></td>
            <td onClick = {this.deleteRow} className="editbox" id = {v.GuID}><Icon  className="fa fa-trash" aria-hidden="true" id = {v.GuID} ></Icon></td>    
          </tr>
      
        )
      }           
            </tbody>
        </table>
      </div>        
                <Edit status1={this.state.status1} />
                <MailingListPopup/>
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