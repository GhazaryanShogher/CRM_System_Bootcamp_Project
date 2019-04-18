import React, {Component, Fragment} from "react";
import './Button.css'

class Button extends Component{

    
    render () {
        return (
            <Fragment>
                <button className = "btn-standart" onClick = {this.props.click}>{this.props.name}</button>
            </Fragment>
        );

    }
}
export default Button;