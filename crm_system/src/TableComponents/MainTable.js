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
             this.setState({data:results})
        })
      }
    render(){
        return(
            <Fragment>
                <Header/> 
                
                <Menu/>
                <TableContent/>
                
           
            </Fragment>
        )
    }
   
}

export default MainTable;

