import React, { Component,Fragment } from 'react';
import './header.css';
import Menu from '../menu/menu';
import { Link } from 'react-router-dom';

class Header extends Component{
    render() {
        return (
            <Fragment>
                <div  className="header">
                    <div className="header_logo"><Link className="logoA" to="/">CRM</Link></div>
                    <Menu />
                </div>  
            </Fragment>
        );
    }
}

export default Header;