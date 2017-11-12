import React, { Component } from 'react';
import './Element.css';

class Element extends Component {
  constructor(props){
    super(props);   
    this.posX = this.props.posX;
    this.posY = this.props.posY;      
  };
     
  render() {  	
    return (
      <div className = {`element ${this.props.active ? "dark" : ""}`}>
         {this.posX}   
         {this.posY}
      </div>
    );
  }
}

export default Element;
