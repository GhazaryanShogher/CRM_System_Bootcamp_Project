import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
    constructor(props){
        super(props)
    }

    callback = () => this.props.callback;

  render() {
    return (
          <div className="w3-rest">
              <input  id={this.props.id} type={this.props.type} placeholder={this.props.placeholder} required onChange = {this.props.callback}/>
          </div>
    );
  }
}

export default Input;
