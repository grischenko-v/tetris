import React, { Component } from 'react';
import './Element.css';

class Element extends Component {
  constructor(props){
    super(props);
    this.value = this.props.value;
    this.posX = this.props.posX;
    this.posY = this.props.posY;  
  }

  render() {
    return (
      <div className = "element">
       
      </div>
    );
  }
}

export default Element;
