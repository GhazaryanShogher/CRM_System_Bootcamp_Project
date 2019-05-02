import React, { Component } from 'react';
import Button from '../../TableComponents/Button/Button';
import Icon from '../../TableComponents/Icon/Icon';
import "./Main.css";
import { Link } from 'react-router-dom';

class MainPage extends Component {
    state = {
        onClick: true,
        status: "none",
        animation: "",
    };
    buttonActive = () => {
        if (this.state.animation === "") {
            this.setState({animation: "shadow 1.4s infinite alternate", status: "inline-block"});
        }
    };
    render() {
        const buttons = [];
        for (var i = 1; i <= 18; i++) {
            if (i % 2 === 1) {
                buttons.push(<Button className ="mailingList" key={i} move={"move"+`${i}`} status = {this.state.status} name = {<Link to="/Mailinglist"><Icon className ="fa fa-envelope"/></Link>}></Button>);
            } else {
                buttons.push(<Button className ="contacts" key={i} move={"move"+`${i}`} status = {this.state.status} name ={<Link to="/Contacts"><Icon className ="fa fa-users"/></Link>}></Button>);
            }
        }
        return (
            <div className="mainDiv">
                { buttons }            
                <button className="mainButton" style = {{animation: this.state.animation}} onClick={this.buttonActive}>CRM</button>
            </div>
        );
    };
};
  
export default MainPage;