import React, { Component } from 'react';
import './Results.css';
import Element from '../Element/Element';

class Results extends Component {
  constructor(props){
    super(props);  
    this.sizeX = 4;
    this.sizeY = 4;
    this.figure = this.props.nextFigure;
    this.hash = {};
    this.hash = this.initHash();
    
  };
  
  indexToPosition(index){
    let xFind = parseInt(index / 10, 10);
    let yFind = index - xFind * 10;
    return {X: xFind, Y: yFind, index: xFind + "" + yFind};
  };

  initHash(){
     let elems = [];
     let temp;
     for(let i = 0; i < this.sizeX * this.sizeY; i++){
       temp = this.indexToPosition(i);
       elems[temp.index] = false;     	
     }       
     return elems;
  };

  createGrid(){   
   let elements = [];  
   let temp;  
   let figureIndex;
   for(let i = 0; i < this.sizeX * this.sizeY; i++){
     temp = this.indexToPosition(i);

     //console.log(temp);
     //if(this.props.nextFigure !== "") console.log(this.props.nextFigure);
     elements.push(<Element posX = {temp.X} posY = {temp.Y} key = {i} active = {this.hash[temp.index]}/>);
   }  
   return elements;
 };

  render() {  	
  	const elements =  this.createGrid();

    return (
      <div className = "resultsblock">
         <div className = "resualt">{this.props.result}</div>
         <div className = "nextfigure_text">Next Figure: </div>
         <div className = "nextfigure">        
            {elements}
         </div>
      </div>
    );
  }
}

export default Results;
