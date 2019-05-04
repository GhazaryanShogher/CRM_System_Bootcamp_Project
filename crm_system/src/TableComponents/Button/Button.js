import React, {Component, Fragment} from "react";
import './Button.css'

class Button extends Component{

    
    render () {
        return (
            <Fragment>
                
                    <button id={this.props.id} className = {this.props.className} onClick = {this.props.click}  disabled = {this.props.disabled} style = {{animationName: this.props.move, display: this.props.status}}>{this.props.name}</button>
        
            </Fragment>
        );

    }
}
export default Button;