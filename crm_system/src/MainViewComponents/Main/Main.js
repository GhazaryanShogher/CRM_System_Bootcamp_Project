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
            this.setState({status: "inline-block"});
        }
    };
    render() {
        const buttons = [];
        for (let i = 1; i <= 8; i++) {
            if (i === 1) {
                buttons.push(<Button className ="mailingList" key={i} move={"move"+`${i}`} status = {this.state.status} name = {<Link className="mainA" to="/Mailinglist"><Icon className ="fa fa-envelope"/></Link>}></Button>);
            } 
            else if (i === 5) {
                buttons.push(<Button className ="contacts" key={i} move={"move"+`${i}`} status = {this.state.status} name ={<Link className="mainA" to="/Contacts"><Icon className ="fa fa-users"/></Link>}></Button>);
            }

            else if (i < 5) {
                buttons.push(<Button className ="otherBtns" key={i} move={"move"+`${i}`} status = {this.state.status} name ={<Icon className ="fa fa-envelope"/>}></Button>);
            }
            else if (i > 5) {
                buttons.push(<Button className ="otherBtns" key={i} move={"move"+`${i}`} status = {this.state.status} name ={<Icon className ="fa fa-users"/>}></Button>);

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