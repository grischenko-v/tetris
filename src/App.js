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
  	let nexPos;
  	let figurePos = [];
    let maxXIndex;
    let nextHash;   
    let rightHash;
    

  	if(!this.state.currentFigure) return;  
    switch(e.key){
      case "ArrowRight":{            
         let cantRight = false;
         for (let i = 0; i < this.state.currentFigure.points.length; i++) 
         	cantRight |= !((this.state.currentFigure.points[i].position.Y + 1) <= 9);
             
         if(!cantRight){
           for (let i = 0; i < this.state.currentFigure.points.length; i++) {      
            this.hash[this.state.currentFigure.points[i].position.index] = false;       
            this.state.currentFigure.points[i].position  = this.indexToPosition(this.state.currentFigure.points[i].position.X  * 10 + (this.state.currentFigure.points[i].position.Y + 1));
           } 
           for (let i = 0; i < this.state.currentFigure.points.length; i++)  this.hash[this.state.currentFigure.points[i].position.index] = true;
           this.setState({   	 
              grid: this.hash,
              createFigure: this.state.currentFigure
            });
         }
        break;
      }
      case "ArrowLeft":{
      	let cantLeft = false;
         for (let i = 0; i < this.state.currentFigure.points.length; i++) 
         	cantLeft |= !((this.state.currentFigure.points[i].position.Y - 1) >= 0);

         if(!cantLeft){
           for (let i = 0; i < this.state.currentFigure.points.length; i++) {      
            this.hash[this.state.currentFigure.points[i].position.index] = false;       
            this.state.currentFigure.points[i].position  = this.indexToPosition(this.state.currentFigure.points[i].position.X  * 10 + (this.state.currentFigure.points[i].position.Y - 1));
           } 
           for (let i = 0; i < this.state.currentFigure.points.length; i++)  this.hash[this.state.currentFigure.points[i].position.index] = true;
           this.setState({   	 
              grid: this.hash,
              createFigure: this.state.currentFigure
            });
         }
        break;
      }
      case "ArrowDown":  {
      let cantDown = false;
         for (let i = 0; i < this.state.currentFigure.points.length; i++) 
         	cantDown |= !((this.state.currentFigure.points[i].position.X + 1) < 20);
         	             
         if(!cantDown){
           for (let i = 0; i < this.state.currentFigure.points.length; i++) {      
            this.hash[this.state.currentFigure.points[i].position.index] = false;       
            this.state.currentFigure.points[i].position  = this.indexToPosition((this.state.currentFigure.points[i].position.X + 1) * 10 + this.state.currentFigure.points[i].position.Y );
           } 
           for (let i = 0; i < this.state.currentFigure.points.length; i++)  this.hash[this.state.currentFigure.points[i].position.index] = true;
           this.setState({   	 
              grid: this.hash,
              createFigure: this.state.currentFigure
            });
         }
        break;
      }
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
      }      
      coords.num = i;
      coords.position = this.indexToPosition(xPos  + yPos * 10);   
      points.push(coords);
     }        
    return {
    	 name: name,
         points: points,
         bottomIndex: [2,3]
    };
 }  

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
        case 1  : 
        case 2  : 
        case 3  : yPos++; break;            
      }      
      coords.num = i;
      coords.position = this.indexToPosition(xPos  + yPos * 10);   
      points.push(coords);
     }        
    return {
    	 name: name,
         points: points,
         bottomIndex: [3]
    };
 };

 createFigure(){
   let figurePos;
   let defaultPos = 4;
   let temp ;
   figurePos = this.createLine();  
   for (let i = 0; i < figurePos.points.length; i++) this.hash[figurePos.points[i].position.index] = true;
   this.setState({    
        currentFigure: figurePos,
        newFigure: false,
        rotateState: rotateState
    });
 };

 _rotateFigure(e){ 	
 	if (e.keyCode === 32 && this.state.currentFigure) {
     switch(this.state.currentFigure.name){
       case "Rect" : break;
       case "Line" :{                    
       	 let basePointX =  this.state.currentFigure.points[0].position.X;
       	 let basePointY =  this.state.currentFigure.points[0].position.Y - 1;
         for (let i = 0; i <  this.state.currentFigure.points.length; i++) {
          this.state.currentFigure.points[i].position.X = basePointX;
          this.state.currentFigure.points[i].position.Y = basePointY;
          basePointY++;
         }
         
         break;
       }
     }
      this.setState({   	 
              grid: this.hash,
              createFigure: this.state.currentFigure
            });
    }
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
 }

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
 }

 moveDown(){
   let nexPos;   
   let maxXIndex = this.state.currentFigure.points[this.getFigureMax(this.state.currentFigure.points)].position.X;  
   let cantMove = false; 
   for (let i = 0; i < this.state.currentFigure.bottomIndex.length; i++) {
   	  let bottomIndex = this.state.currentFigure.bottomIndex[i];
   	  let xBottomPos = this.state.currentFigure.points[bottomIndex].position.X;
   	  let yBottomPos = this.state.currentFigure.points[bottomIndex].position.Y;
      let nextHash = this.indexToPosition((xBottomPos + 1) * 10 + yBottomPos);
      cantMove |= this.hash[nextHash.index];
   }
   if(maxXIndex< 19 && !cantMove){  
      for (let i = 0; i < this.state.currentFigure.points.length; i++) {            
         this.hash[this.state.currentFigure.points[i].position.index] = false;
         this.state.currentFigure.points[i].position  = this.indexToPosition((this.state.currentFigure.points[i].position.X + 1) * 10 + this.state.currentFigure.points[i].position.Y);
      } 
      for (let i = 0; i < this.state.currentFigure.points.length; i++)  this.hash[this.state.currentFigure.points[i].position.index] = true;
      this.setState({   	 
   	        grid: this.hash
            });
   }else{
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
