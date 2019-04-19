import React, { Component, Fragment } from 'react';
import './tableContent.css';
import TableFooter from '../tableFooter/tableFooter';

class TableContent extends Component{
    render() {
        return (
            <Fragment>
                <div className="test">
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
            <i className="fa fa-spinner fa-spin">Comming Soon..Cant wait...</i>
            <TableFooter/>
            </div>
               
                
            </Fragment>
        );
    }
}

export default TableContent;