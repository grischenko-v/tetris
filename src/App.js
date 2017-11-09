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
  		grid: this.hash,
  		frameId: "",
        currentFigure: ""
  	};    
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animationloop = this.animationloop.bind(this);  
    this.createGrid = this.createGrid.bind(this);      
    this.initGrid = this.initGrid.bind(this);  
    
  }; 

  componentWillMount(){    
    document.addEventListener("keydown", this._figureMove.bind(this), false);  
    document.addEventListener("keydown", this._rotateFigure.bind(this), false);  
  };

  componentDidMount() {
    this.start();    
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._figureMove.bind(this), false);  
    document.removeEventListener("keydown", this._rotateFigure.bind(this), false); 
  };

  _figureMove(e){ 
    let newFigure = this.state.currentFigure;
  	if(!this.state.currentFigure) return;  
    switch(e.key){
      case "ArrowRight":{            
         let cantRight = false;

         for (let i = 0; i < newFigure.points.length; i++){ 
         	let newPos = this.indexToPosition(newFigure.points[i].position.X * 10 + newFigure.points[i].position.Y + 1);
         	cantRight |= !((newFigure.points[i].position.Y + 1) <= 9) 
            cantRight |= this.hash[newPos.index];
         } 

         if(!cantRight){
           for (let i = 0; i < newFigure.points.length; i++) {      
            this.hash[newFigure.points[i].position.index] = false;       
            newFigure.points[i].position  = this.indexToPosition(newFigure.points[i].position.X  * 10 + (newFigure.points[i].position.Y + 1));
           } 
           for (let i = 0; i < newFigure.points.length; i++)  this.hash[newFigure.points[i].position.index] = true;
           this.setState({   	 
              grid: this.hash,
              createFigure: newFigure
            });
         }
        break;
      }
      case "ArrowLeft":{
      	let cantLeft = false;
         for (let i = 0; i < newFigure.points.length; i++){
         	let newPos = this.indexToPosition(newFigure.points[i].position.X * 10 + newFigure.points[i].position.Y - 1);
         	cantLeft |= !((newFigure.points[i].position.Y - 1) >= 0);
            cantLeft |= this.hash[newPos.index];          
         }         
         if(!cantLeft){
           for (let i = 0; i < newFigure.points.length; i++) {      
            this.hash[newFigure.points[i].position.index] = false;       
            newFigure.points[i].position  = this.indexToPosition(newFigure.points[i].position.X  * 10 + (newFigure.points[i].position.Y - 1));
           } 
           for (let i = 0; i < newFigure.points.length; i++)  this.hash[newFigure.points[i].position.index] = true;
           this.setState({   	 
              grid: this.hash,
              createFigure: newFigure
            });
         }
        break;
      }
      case "ArrowDown":  {      
        this.moveDown();
        break;
      }
      default: break;
    }     
  };
  
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

 createRect(){
    let points = [];
    let xPos = 4;
    let yPos = 0;
    let name = "Rect";
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                 break;
        case 1  : 
        case 3  : xPos++;         break;
        case 2  : xPos--; yPos++; break;  
        default: break;          
      }      
      coords.num = i;
      coords.position = this.indexToPosition(xPos  + yPos * 10);   
      points.push(coords);
     }        
    return {
    	 name: name,
         points: points        
    };
 };

 createLine(){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "Line";
    let rotateState = 0;
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :         break;           
        case 1  : yPos++; break;
        case 2  : 
        case 3  : yPos++; break;  
       default: break;          
      }      
      console.log("i: " + i);
      coords.num = i;
      coords.position = this.indexToPosition(xPos  + yPos * 10);   
      points.push(coords);
     }        
    return {
    	 name: name,
         points: points,         
         rotateState: rotateState
    };
 };

 createFigure(){
   let figurePos;  
   figurePos = this.createLine();//this.createRect();  
   for (let i = 0; i < figurePos.points.length; i++) this.hash[figurePos.points[i].position.index] = true;
   this.setState({    
        currentFigure: figurePos,
        newFigure: false
    });
 };

 _rotateFigure(e){ 	
 	if (e.keyCode === 32 && this.state.currentFigure) {
  	  let newFigure = this.state.currentFigure;
      let x0 = this.getAverageX(newFigure.points);
      let y0 = this.getAverageY(newFigure.points);    
         
      let newXMas = [];
      let newYMas = [];

      for (let i = 0; i < newFigure.points.length; i++) {
        let newX = x0 - newFigure.points[i].position.Y + y0;
        let newY = y0 + newFigure.points[i].position.X - x0;
        if(newX > 19 || newX < 0 || newY > 9 || newY < 0 
           || this.hash[this.indexToPosition(newX * 10 + newY)]) return ;
        else{
         newXMas.push(newX);
         newYMas.push(newY);
        }
      }

      for (let i = 0; i < this.state.currentFigure.points.length; i++)
    	this.hash[this.state.currentFigure.points[i].position.index] = false;       
        
      for(let i = 0; i < newFigure.points.length; i++)
       	newFigure.points[i].position = this.indexToPosition(newXMas[i] * 10 + newYMas[i]);
      
      for (let i = 0; i < newFigure.points.length; i++) 
    	this.hash[newFigure.points[i].position.index] = true; 
      
      this.setState({   	 
            grid: this.hash,
            createFigure: newFigure
        });
      
     }
 };

 isFigurePoint(point){
   let figure = this.state.currentFigure;  
   for(let i = 0; i < figure.points.length; i++)  
   	 if(this.state.currentFigure.points[i].position.index === point.index) return true;   
   return false;
 };
 
 canMoveDown(){
   let curX;
   let curY; 
   let nextPos;
   for (var i = 0; i < this.state.currentFigure.points.length; i++) {
 	 curX = this.state.currentFigure.points[i].position.X;
     curY = this.state.currentFigure.points[i].position.Y;
     nextPos = this.indexToPosition((curX + 1) * 10 + curY);   
     if (this.hash[nextPos.index] && !this.isFigurePoint(nextPos)) return false;
  }
  return true;
 };

 getFigureMax(arr){
    let index = 0;
    let max   = 0;
    for (var i = 0; i < arr.length; i++) {
      if(arr[i].position.X > max){
       max = arr[i].position.X;
       index = i; 
      } 
    }
    return index;
 };

  getFigureMaxRight(arr){
    let index = 0;
    let max   = 0;
    for (var i = 0; i < arr.length; i++) {
      if(arr[i].position.X > max){
       max = arr[i].position.X;
       index = i; 
      } 
    }
    return index;
 };

 moveDown(){   
   let maxXIndex = this.state.currentFigure.points[this.getFigureMax(this.state.currentFigure.points)].position.X;     
   let newFigure =  this.state.currentFigure;
   if(this.canMoveDown() && maxXIndex< 19){  
      for (let i = 0; i < this.state.currentFigure.points.length; i++) {            
         this.hash[newFigure.points[i].position.index] = false;
         newFigure.points[i].position  = this.indexToPosition((newFigure.points[i].position.X + 1) * 10 + newFigure.points[i].position.Y);
      } 
      for (let i = 0; i < newFigure.points.length; i++)  this.hash[newFigure.points[i].position.index] = true;
      this.setState({   	 
   	        grid: this.hash,
   	        createFigure: newFigure
            });
   }else{
   	   this.setState({
         currentFigure: "" 
       });
   }
 };  

  getAverageX(arr){
  	let sum = 0;
  	for (var i = 0; i < arr.length; i++) 
  		sum += arr[i].position.X;

  	return Math.floor(sum/arr.length);
  };
  
  getAverageY(arr){
  	let sum = 0;
  	for (var i = 0; i < arr.length; i++) 
  		sum += arr[i].position.Y;

  	return Math.floor(sum/arr.length);
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
    let xFind = parseInt(index / 10, 10);
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
 };
}

export default App;
