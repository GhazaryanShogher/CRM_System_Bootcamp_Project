import React, {Component, Fragment} from "react";
import './Button.css'
import Icon from '../Icon/Icon'

class Button extends Component{

    
    render () {
        return (
            <Fragment>
                <div title="Button slide blue/green" class="button btnSlide btnBlueGreen">
                    <span className="top"> <i className="fa fa-folder-open" aria-hidden="true"></i></span>
                    <button className = "btn-standart" onClick = {this.props.click}>{this.props.name}</button>
                </div>
            </Fragment>
        );

    }
}
export default Button;