import React, { Component } from 'react';
import Element from './Element/Element'
import './App.css';

class App extends Component {

  constructor(){
  	super();
  	this.frameCount = 0;
  	this.fps = 60;

  	this.sizeX = 10;
  	this.sizeY = 20;
  	this.state = {
  		newFigure: false,
  		grid: this.initGrid(),
  		frameId: ""
  	};    
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animationloop = this.animationloop.bind(this);
    this.updateGrid = this.updateGrid.bind(this);    
  };
    
  
  componentDidMount() {
    this.start();    
  }

  start(){
   if( !this.state.frameId ) {
    this.setState({
        frameId: window.requestAnimationFrame( this.animationloop ),
        isDie: false
      });     
     }
  };

 stop(){
    window.cancelAnimationFrame( this.state.frameId );
 };
 
 animationloop(){
 	let  newGrid = this.state.grid;
    if(this.frameCount < this.fps) this.frameCount++;
    else{
    	 newGrid = this.updateGrid();     	   	  
    }
    this.setState({    
       grid:  newGrid,
       frameId: window.requestAnimationFrame( this.animationloop )
    });
 };

 updateGrid(){ 
   let elems = [];
   let xPos = 0;
   let yPos = 0;
   for(let i = 0; i < this.sizeX * this.sizeY; i++){

   	  if(!this.state.newFigure && xPos === 4 && yPos === 0){
        elems.push(<Element posX = {xPos} posY = {yPos} key = {i} active = {true}/>)
        this.setState({  
          //  newFigure: true
        });	
   	  }
      else elems.push(<Element posX = {xPos} posY = {yPos} key = {i}/>) 
      
      if(xPos < 9) xPos++;
      else {
       	xPos = 0;
       	yPos++;
       }     
   }     
   return elems;
  };


  initGrid(){
     let elems = [];
     let xPos = 0;
     let yPos = 0;
     for(let i = 0; i < this.sizeX * this.sizeY; i++){
     	elems.push(<Element posX = {xPos} posY = {yPos} key = {i} />)     	
        if(xPos < 9) xPos++;
        else {
        	xPos = 0;
        	yPos++;
        }     
     }     
     return elems;
  };
 
  indexToPosition(index){
    let yFind = parseInt(index / 10);
    let xFind = index - yFind * 10;
    return {X: xFind, Y: yFind, index: xFind + "" + yFind};
  };

  createGrid(){   
   let elements = [];  
   let temp;  
   for(let i = 0; i < Math.pow(this.props.size, 2); i++){
     temp = this.indexToPosition(i);    
     elements.push(this.state.aliveMas[temp.index]);
   }  
   return elements;
 };

 render() {
   return (
     <div className="field-container">
       {this.state.grid}
     </div>
   );
 }
}

export default App;
