import React, {Component, Fragment} from "react";
import './Button.css'

class Button extends Component{

    
    render () {
        return (
            <Fragment>
                <a href="" title="Button slide blue/green" class="button btnSlide btnBlueGreen">
      <span class="top" data-content="Slide">Slide</span>
      <button className = "btn-standart" onClick = {this.props.click}>{this.props.name}</button>
    </a>
            </Fragment>
        );

    }
}
export default Button;