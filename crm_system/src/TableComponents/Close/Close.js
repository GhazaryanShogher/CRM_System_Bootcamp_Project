import React, { Component } from 'react';
import './Close.css';

class Close extends Component {

    callback = () => this.props.callback;

  render() {
    return (
        <div  className= "close" onClick = {this.props.callback}><i className="fa fa-times" aria-hidden="true"></i></div>
    );
  }
}

export default Close;
