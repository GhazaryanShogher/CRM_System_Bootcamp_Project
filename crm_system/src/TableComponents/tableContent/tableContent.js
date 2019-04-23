import React, { Component, Fragment } from 'react';
import './tableContent.css';
//import TableFooter from '../tableFooter/tableFooter';

class TableContent extends Component{
    state = {
        editTd:false,
        data: []
        };

   componentDidMount(){  
    fetch('http://visual.istclabz.com:2112/api/contacts')
        .then((resp) => {return resp.json()})
        .then((results) => { 
         this.setState({data: results})
    })

  }  
  
  editTr = () => {this.setState({editTd:true})
  console.log(this.state.editTd)
  }

    render() {
        return (
            <Fragment>
              <div className="ddd"> 
            <thead>
                <tr>
                    <th>Select</th>
                    <th>FullName</th>
                    <th>CompanyName</th>
                    <th>Position</th>
                    <th>Counrty</th>
                    <th>Email</th>
                    <th>Edit</th>
                </tr>
            </thead>
            
            {this.state.data.map((v,i) =>
          
          <tr>
            <td className="checkbox"><input type = "checkbox"/></td>
            <td style={{contenteditable:this.state.editTd}}>{v["Full Name"]}</td>
            <td style={{contenteditable:this.state.editTd}}>{v["Company Name"]}</td>
            <td style={{contenteditable:this.state.editTd}}>{v.Position}</td>
            <td style={{contenteditable:this.state.editTd}}>{v.Counrty}</td>
            <td style={{contenteditable:this.state.editTd}}>{v.Email}</td>
            <td onClick = {this.editTr} className="editbox"><i class="fa fa-cogs" aria-hidden="true"></i></td>       
          </tr>
      
        )
      }           
            </div>        
                
            </Fragment>
        );
    }
}

export default TableContent;