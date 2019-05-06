import React, { Component,Fragment } from 'react';
import './header.css';
import Menu from '../menu/menu';

class Header extends Component{
    render() {
        return (
            <Fragment>
                <div  className="header">
                    <div className="header_logo"><span>CRM</span></div>
                    <Menu />
                </div>  
            </Fragment>
        );
    }
}

export default Header;