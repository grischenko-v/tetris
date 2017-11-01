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
  	this.hash = this.initGrid();
  	this.state = {
  		newFigure: false,
  		grid: this.hash,
  		frameId: "",
        currentFigure: ""
  	};    
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animationloop = this.animationloop.bind(this);  
    this.createGrid = this.createGrid.bind(this);      
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
         if(!this.state.currentFigure) this.createFigure();
    	 else this.moveDown();  	   	  
    }
    this.setState({    
       grid:  newGrid,
       frameId: window.requestAnimationFrame( this.animationloop )
    });
 };

 createFigure(){
 let figurePos = [];
 let temp = this.indexToPosition(5);
 figurePos.push(temp);
   this.hash["05"] = <Element posX = {0} posY = {5} key = {5} active = {true}/>;
   this.setState({    
        currentFigure: figurePos
    });
 };

 moveDown(){
   if(true){
      this.hash[this.state.currentFigure.index] = <Element posX = {0} posY = {5} key = {5} active = {false}/>;
     // console.log(this.state.currentFigure);
   }
 };

  initGrid(){
     let elems = [];
     let temp;
     for(let i = 0; i < this.sizeX * this.sizeY; i++){
       temp = this.indexToPosition(i);
       elems[temp.index] = (<Element posX = {temp.X} posY = {temp.Y} key = {i} />)     	
     }       
     return elems;
  };
 
  indexToPosition(index){
    let xFind = parseInt(index / 20);
    let yFind = index - xFind * 20;
    return {X: xFind, Y: yFind, index: xFind + "" + yFind};
  };

  createGrid(){   
   let elements = [];  
   let temp;  
   for(let i = 0; i < this.sizeX * this.sizeY; i++){
     temp = this.indexToPosition(i);   
     elements.push(this.state.grid[temp.index]);
   }  
   return elements;
 };

 render() {
   const elements = this.createGrid();	
   return (
     <div className="field-container">
      {elements}
     </div>
   );
 }
}

export default App;
