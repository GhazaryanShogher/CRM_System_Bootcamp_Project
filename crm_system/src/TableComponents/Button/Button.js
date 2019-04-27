import React, {Component, Fragment} from "react";
import './Button.css'

class Button extends Component{

    
    render () {
        return (
            <Fragment>
                
                    <button className = {this.props.className} onClick = {this.props.click} style = {{animationName: this.props.move, display: this.props.status}}>{this.props.name}</button>
        
            </Fragment>
        );

    }
}
export default Button;