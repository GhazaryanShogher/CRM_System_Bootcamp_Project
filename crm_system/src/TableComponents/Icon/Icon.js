import React, {Component, Fragment} from "react";
import './Icon.css'

class Icon extends Component{

    
    render () {
        return (
            <Fragment>
                <i className = {this.props.className} ></i>
            </Fragment>
        );

    }
}
export default Icon;