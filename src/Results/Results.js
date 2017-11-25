import React, { Component } from 'react';
import './Results.css';
import Element from '../Element/Element';

class Results extends Component {
  constructor(props){
    super(props);  
    this.sizeX = 4;
    this.sizeY = 4;
  };
  
  indexToPosition(index){
    let xFind = parseInt(index / 10, 10);
    let yFind = index - xFind * 10;
    return {X: xFind, Y: yFind, index: xFind + "" + yFind};
  };

  createGrid(){   
   let elements = [];  
   let temp;  
   for(let i = 0; i < this.sizeX * this.sizeY; i++){
     temp = this.indexToPosition(i);   
     elements.push(<Element posX = {temp.X} posY = {temp.Y} key = {i} active = {false}/>);
   }  
   return elements;
 };

  render() {  	
  	const elements = this.createGrid();	
    return (
      <div className = "resultsblock">
         <div className = "resualt">{this.props.result}</div>
         <div className = "nextfigure_text">Next Figure:</div>
         <div className = "nextfigure">        
            {elements}
         </div>
      </div>
    );
  }
}

export default Results;
