import React, { Component } from 'react';
import './Close.css';
import { Link } from 'react-router-dom';

class Close extends Component {

    // callback = () => this.props.callback;

  render() {
    return (
        <span  className= "close" /*onClick = {this.props.callback}*/><Link to="/Contacts"><i className="fa fa-times" aria-hidden="true"></i></Link></span>
    );
  }
}

export default Close;
