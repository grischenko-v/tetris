import React, { Component } from 'react';
import Element from './Element/Element'
import './App.css';

class App extends Component {

  constructor(){
  	super();
  	this.frameCount = 0;
  	this.fps = 100;
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
 	let  newGrid = this.hash;
    if(this.frameCount < this.fps) this.frameCount++;
    else{
    	this.frameCount = 0;
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
   console.log(123);
   this.hash[temp.index] = <Element posX = {temp.X} posY = {temp.Y} key = {5} active = {true}/>;
   this.setState({    
        currentFigure: figurePos
    });
 };

 moveDown(){
   let temp;
   let figurePos = [];
   if(true){
   	  temp = (this.hash[this.state.currentFigure[0].index].props.posX + 1) + "" + this.hash[this.state.currentFigure[0].index].props.posY;
   	  figurePos.push(temp);
      console.log(temp);
      this.hash[this.state.currentFigure[0].index] = <Element posX = {this.state.currentFigure[0].X} posY = {this.state.currentFigure[0].Y}  key = {5} active = {false}/>;
      
      this.hash[temp] = <Element posX = {this.state.currentFigure[0].X + 1} posY = {this.state.currentFigure[0].Y}  key = {12313} active = {true}/>;
      // this.hash[this.state.currentFigure[0].index].props.posX;
    //  console.log(this.indexToPosition(figurePos[0]));
      
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
    let xFind = parseInt(index / 10);
    let yFind = index - xFind * 10;
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
