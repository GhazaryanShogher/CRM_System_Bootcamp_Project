import React, { Component,Fragment } from 'react';
import './header.css';
import TableFooter from '../tableFooter/tableFooter';

class Header extends Component{
    render() {
        return (
            <Fragment>
                <div  className="header">
                <div className="header_logo"></div>
                <div className="header_btn"><TableFooter/></div>

            </div>
            </Fragment>
        );
    }
}

export default Header;