import React, {Component, Fragment} from "react";
import './Div.css'

class Div extends Component{

    
    render () {
        return (
            <Fragment>
                <div className = "mailList" id = {this.props.id} onClick = {this.props.click} text = {this.props.text}>{this.props.name}</div>
            </Fragment>
        );

    }
}
export default Div;