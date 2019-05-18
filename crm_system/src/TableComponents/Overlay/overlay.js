import React, { Component } from 'react';
import './overlay.css';

class Overlay extends Component{
	
	render(){
		return(
		<div className="overlay" style={{display:this.props.status}}>
		</div>
		);
		
	}
	
}

export default Overlay;
