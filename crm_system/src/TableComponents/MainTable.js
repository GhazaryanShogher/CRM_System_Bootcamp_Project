import React, {Component, Fragment} from 'react';
import Header from "./Header/header"; 
//import Menu from './menu/menu';
import TableContent from './tableContent/tableContent';
import './MainTable.css';
//import MailingList from './MailingList/MailingList';

class MainTable extends  Component {
    
    render(){
        return(
            <Fragment>
                <Header/> 
                {/* <Menu/> */}
                <TableContent/>
                {/* <MailingList/> */}
            </Fragment>
        )
    }
   
}

export default MainTable;

