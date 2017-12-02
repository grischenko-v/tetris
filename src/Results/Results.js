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
    this.state = {  	
  		grid: this.hash  		
  	};
  };
  
  indexToPosition(index){
    let xFind = parseInt(index / 4, 4);
    let yFind = index - xFind * 4;

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

  updateHash(){
   let figure = this.cloneFigure(this.props.nextFigure);
   if(figure) {  
    for(let i = 0; i < figure.points.length; i++){     
       let x = figure.points[i].position.X  ;
       let y = figure.points[i].position.Y - 3;
       let index =  x + "" + y;
       this.hash[index] = true;
     }     
   }
  };

  createGrid(){   
   let elements = [];  
   let temp; 
   this.hash = this.initHash(); 
   this.updateHash();  

   for(let i = 0; i < this.sizeX * this.sizeY; i++){
     temp = this.indexToPosition(i);      
     elements.push(<Element posX = {temp.X} posY = {temp.Y} key = {i} active = {this.hash[temp.index]}/>);
   }  
   return elements;
 };


 cloneFigure(obj) {
    if (null == obj || "object" !== typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
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
