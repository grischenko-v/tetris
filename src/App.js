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
        currentFigure: "",
        value: true
  	};    
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animationloop = this.animationloop.bind(this);  
    this.createGrid = this.createGrid.bind(this);      
    this.initGrid = this.initGrid.bind(this);  
    
  };    
  
  componentDidMount() {
    this.start();    
  }

  componentWillMount(){    
    document.addEventListener("keydown", this._figureMove.bind(this), false);  
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this._figureMove.bind(this), false);  
   
  };

  _figureMove(e){
  	let nexPos;
  	let figurePos = [];
    switch(e.key){
      case "ArrowRight":{
        nexPos = this.indexToPosition(this.state.currentFigure[0].X  * 10 + (this.state.currentFigure[0].Y + 1));
        this.hash[this.state.currentFigure[0].index] = false;     
        this.hash[nexPos.index] = true;
        figurePos.push(nexPos);
        break;
      }
      case "ArrowLeft":{
        nexPos = this.indexToPosition(this.state.currentFigure[0].X  * 10 + (this.state.currentFigure[0].Y - 1));
        this.hash[this.state.currentFigure[0].index] = false;     
        this.hash[nexPos.index] = true;
        figurePos.push(nexPos);
        break;
      }
      case "ArrowDown":  console.log(e.key); break;
    } 
    this.setState({
      	currentFigure: figurePos 
    });   
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
   this.hash[temp.index] = null;   
   this.hash[temp.index] = true; 
   this.setState({    
        currentFigure: figurePos,
        newFigure: false
    });
 };

 moveDown(){
   let nexPos;
   let figurePos = [];
   nexPos = this.indexToPosition((this.state.currentFigure[0].X + 1) * 10 + this.state.currentFigure[0].Y);
   if(nexPos.X < 20 && !this.hash[nexPos.index]){   
      this.hash[this.state.currentFigure[0].index] = false;     
      this.hash[nexPos.index] = true;
      figurePos.push(nexPos);
      this.setState({
      	currentFigure: figurePos 
      });      
   }
   else{
   	  this.setState({
      	currentFigure: "" 
      });
   }
 };

  initGrid(){
     let elems = [];
     let temp;
     for(let i = 0; i < this.sizeX * this.sizeY; i++){
       temp = this.indexToPosition(i);
       elems[temp.index] = false;     	
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

     elements.push(<Element posX = {temp.X} posY = {temp.Y} key = {i} active = {this.state.grid[temp.index]}/>);
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
