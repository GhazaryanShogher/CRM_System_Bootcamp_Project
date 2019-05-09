import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
    

    callback = () => this.props.callback;

  render() {
    return (
          <div className="w3-rest">
              <label >{this.props.text}</label>
              <input value = {this.props.val} id={this.props.id} display = {this.props.display} className={this.props.class} type={this.props.type} placeholder={this.props.placeholder} required onChange = {this.props.callback}/>
          </div>
    );
  }
}

export default Input;
