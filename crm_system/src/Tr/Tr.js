import React, {Component, Fragment} from "react";

class Tr extends Component{

    
    render () {
        return (
            <Fragment>
                <tr className = {this.props.className} id = {this.props.id} onClick = {this.props.click} text = {this.props.text}>{this.props.name}</tr>
            </Fragment>
        );

    }
}
export default Tr;