import React, {Component, Fragment} from 'react';
import Header from "./Header/header";
import Menu from './menu/menu';
import TableContent from './tableContent/tableContent';
import './MainTable.css';

class MainTable extends  Component {
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
      .catch(error => console.log("error",error))
    }  
    
    editTr = () => {this.setState({editTd:true})
    console.log(this.state.editTd)
    }
    render(){
        return(
            <Fragment>
                <Header/> 
                <Menu/>
                <TableContent/>
                {
          this.state.data.map((v,i) => 
          <tr>
              <td><input type = "checkbox"/></td>
              <td style={{contenteditable:this.state.editTd}}>{v["Full Name"]}</td>
              <td style={{contenteditable:this.state.editTd}}>{v["Company Name"]}</td>
              <td style={{contenteditable:this.state.editTd}}>{v.Position}</td>
              <td style={{contenteditable:this.state.editTd}}>{v.Counrty}</td>
              <td style={{contenteditable:this.state.editTd}}>{v.Email}</td>
              <td onClick = {this.editTr}><i className = "fa fa-pencil-square-o"></i></td>       
          </tr>
          )
        }           
            </Fragment>
        )
    }
   
}

export default MainTable;

