import React, {Component, Fragment} from 'react';
import Header from "./Header/header";
import Menu from './menu/menu';
import TableContent from './tableContent/tableContent';

class MainTable extends  Component {
    render(){
        return(
            <Fragment>
                <Header/> 
                <div>
                <Menu/>
                <TableContent/>
                </div>
           
            </Fragment>
        )
    }
   
}

export default MainTable;

