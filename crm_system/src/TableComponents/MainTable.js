import React, {Component, Fragment} from 'react';
import Header from "./Header/header";
import Menu from './menu/menu';
import TableContent from './tableContent/tableContent';
import './MainTable.css';

class MainTable extends  Component {

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

