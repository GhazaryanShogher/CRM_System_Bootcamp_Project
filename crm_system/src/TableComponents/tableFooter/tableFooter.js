import React, {Component} from 'react';
import './tableFooter.css'
import SelectTemplate from '../Header/selectTemplate/selectTemplate';
import Button from '../Button/Button'
import Form from '../Forms/Form';

class TableFooter extends Component {
    state = {
        status: "none"
    }

    addContact = ()=>{
        this.setState({status: "block"})
    }
    
    render() {
        return (
            
                <div className="btnBox">
                <Form status = {this.state.status}/>
                    
                        <SelectTemplate/>
                    
                        <Button  name={"Send Email"} className= "CB1">
                            <i className="fa fa-envelope" aria-hidden="true"></i><br />Send Email
                        </Button>
                    
                    
                    <Button name={"Add to Mail List"}  className= "CB1">
                    <i className="fa fa-folder-open" aria-hidden="true"></i>
                    </Button>
                    
                    
                    <Button  name={"Delete Selected"}  className= "CB1">
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
           
        );
    }

}
export default TableFooter ;
