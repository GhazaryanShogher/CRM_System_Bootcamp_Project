import React, {Component, Fragment} from 'react';
import TableContent from './tableContent/tableContent';
import './MainTable.css';

class MainTable extends  Component {
    render(){
        return(
            <Fragment>
                <TableContent/>
            </Fragment>
        )
    }
}

export default MainTable;
