import React, {Component, Fragment} from 'react';
import Header from "./Header/header";
import Menu from './menu/menu';
import TableContent from './tableContent/tableContent';

class MainTable extends  Component {

        state = {
          data: []
          };

     componentDidMount(){  
      fetch('http://visual.istclabz.com:2112/api/contacts')
          .then((resp) => {return resp.json()})
          .then((results) => { 
           this.setState({data: results})
      })
    }   

    render(){
        return(
            <Fragment>
                <Header/> 
                <div>
                <Menu/>
                <TableContent/>

                {
          this.state.data.map((v,i) => 
          <tr>
              <td><input type = "checkbox"/></td>
              {/* <td>{v.Full Name}</td>
              <td>{v.Company Name}</td> */}
              <td>{v.Position}</td>
              <td>{v.Counrty}</td>
              <td>{v.Email}</td>
              <td><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>       
          </tr>
          )
        }

                </div>
           
            </Fragment>
        )
    }
   
}

export default MainTable;

