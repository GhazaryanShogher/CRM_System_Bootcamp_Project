import React, { Component,Fragment } from 'react';
import './header.css';
import Menu from '../menu/menu';
import HeaderButton from '../HeaderButton/HeaderButton';

class Header extends Component{
    state={
        status: "none"
        };


    openButton = () => {
        this.setState({ status: "block", })
      }
    


    render() {
        return (
            <Fragment>
                <div  className="header">
                    <div className="header_logo" onClick = {this.openButton}><span>CRM</span></div>
                    {/* <HeaderButton/> */}
                    <Menu status={this.state.status}/> 
                </div>
                
            </Fragment>
        );
    }
}

export default Header;