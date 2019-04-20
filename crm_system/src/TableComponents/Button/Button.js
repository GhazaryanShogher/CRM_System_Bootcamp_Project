import React, {Component, Fragment} from "react";
import './Button.css'
//import Icon from '../Icon/Icon'

class Button extends Component{

    
    render () {
        return (
            <Fragment>
                
                    <button className = {this.props.className} onClick = {this.props.click}>{this.props.name}</button>
        
            </Fragment>
        );

    }
}
export default Button;