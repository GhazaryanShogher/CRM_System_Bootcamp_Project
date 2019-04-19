import React, {Component} from 'react';
import './tableFooter.css'
import SelectTemplate from '../Header/selectTemplate/selectTemplate';
import Button from '../Button/Button'

class TableFooter extends Component {
    
    render() {
        return (
            
                <div className="btnBox">
                    <div id="templateSelectBox">
                        <SelectTemplate/>
                    
                        <button  className="tableButtons">
                            <i className="fa fa-envelope" aria-hidden="true"></i><br />Send Email
                        </button>
                    </div>
                    
                    <Button name={"Add to Mail List"} >
                    <i className="fa fa-folder-open" aria-hidden="true"></i><br /> Add to Mailing list
                    </Button>
                    
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <button  className="deleteBtn tableButtons">
                    <i className="fa fa-trash-o" aria-hidden="true"></i><br />Delete Selected
                    </button>

                    <button  className="tableButtons">
                    <i className="fa fa-user-plus" aria-hidden="true"></i><br />Add Contact
                    </button>

                    <div className="maillist">
                        <input type="text" ref="createMList" className="inputMail" placeholder="Add a Mailing List Name"/>
                    </div>

                    <button 
                    
                            className="tableButtons"><i className="fa fa-list-alt" aria-hidden="true"></i><br />Create Mailing list
                    </button>

                    <button className="tableButtons" >
                    <i className="fa fa-cloud-upload" aria-hidden="true"></i><br />Upload
                    </button>
                </div>
           
        );
    }

}
export default TableFooter ;
