import React, { Component } from 'react';
import Element from './Element/Element'
import Results from './Results/Results'
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
    switch(e.keyCode){
      case 	39:{            
        if(this.canMoveRight()){
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
      case 	37:{      	       
        if(this.canMoveLeft()){
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
      case 40:  {      
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
    let f = 0;
    if(this.frameCount < this.fps) {
      this.frameCount++;        
    }
    else{
    	this.frameCount = 0;                

        if(!this.state.currentFigure){   
          f = this.checkFullLine();          
          this.moveAllDown(f);      
          this.createFigure();
        }
        else{
         this.moveDown();      
        }  	   	  
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
      coords.num = i;
      coords.position = this.indexToPosition(xPos  + yPos * 10);   
      points.push(coords);
     }        
    return {
    	 name: name,
         points: points        
    };
 };
  
  createGRight(){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "Line";   
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                 break;           
        case 1  : xPos++;         break;
        case 2  : xPos--; yPos++; break;
        case 3  : yPos++;         break;  
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

  createGLeft(){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "Line"; 
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                 break;           
        case 1  : xPos--;         break;
        case 2  : xPos++; yPos++; break;
        case 3  : yPos++;         break;  
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

 createZRight(){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "Line";  
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                          break;           
        case 1  : yPos++;                  break;
        case 2  : xPos--;                  break;
        case 3  : yPos--; xPos = xPos + 2; break;  
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

 createZLeft(){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "Line";
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                          break;           
        case 1  : yPos++;                  break;
        case 2  : xPos++;                  break;
        case 3  : yPos--; xPos = xPos - 2; break;  
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
 
 createEp(){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "Line";    
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                 break;           
        case 1  : xPos++;         break;
        case 2  : xPos--; yPos++; break;
        case 3  : yPos--; xPos--; break;  
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

 createFigure(){
   let figurePos;  
   figurePos = this.createRect(); 
   switch(Math.floor(Math.random() * 7)){
     case 0 : figurePos = this.createRect();   break;      
     case 1 : figurePos = this.createLine();   break;    
     case 2 : figurePos = this.createGRight(); break; 
     case 3 : figurePos = this.createGLeft();  break; 
     case 4 : figurePos = this.createZRight(); break; 
     case 5 : figurePos = this.createZLeft();  break;
     case 6 : figurePos = this.createEp();     break; 
     default: break; 
   };  
   for (let i = 0; i < figurePos.points.length; i++) this.hash[figurePos.points[i].position.index] = true;
   this.setState({    
        currentFigure: figurePos,
        newFigure: false
    });
 };
 
 checkFullLine(){
    let curLine = [];
    let counter = 0;
    let fullLines = 0;
    let lineNum = 0;
    for (let i = 0; i < this.sizeX * this.sizeY; i++) {
      if(counter > 9){
        counter = 0;
        lineNum++;  
        curLine = [];
      }

      counter++;
     
      let position = this.indexToPosition(i);
      if(this.hash[position.index]){
          curLine.push(position);      
      }     
      if(curLine.length > 9){        
        for (let j = 0; j < curLine.length; j++) {
          this.hash[curLine[j].index] = false;          
        }        
         fullLines++; 
         
         this.setState({   	 
           grid: this.hash
          });          
      }     
    }    
    return fullLines;
 };

 moveAllDown(lines){
   let newHash = {};
   let nextPos, curPos;       
      for (let i = 0; i < this.sizeX * (this.sizeY); i++) {
     let temp = this.indexToPosition(i);
   	 newHash[temp.index] = this.hash[temp.index];
   } 
   for (let i = 0; i < this.sizeX * (this.sizeY - lines); i++) {
     let temp = this.indexToPosition(i);
   	 newHash[temp.index] = false;
   } 		
   for (let i = 0; i < this.sizeX * (this.sizeY - lines); i++) {
     curPos = this.indexToPosition(i);
     nextPos = this.indexToPosition(i + 10 * lines);  
     if (this.hash[curPos.index] && this.hash[nextPos.index] !== undefined) {
        newHash[nextPos.index] = true;        
     }
   }
   this.hash = newHash;

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

 canMoveLeft(){
   let curX;
   let curY; 
   let nextPos;
   for (var i = 0; i < this.state.currentFigure.points.length; i++) {
 	 curX = this.state.currentFigure.points[i].position.X;
     curY = this.state.currentFigure.points[i].position.Y;
     nextPos = this.indexToPosition(curX  * 10 + curY - 1);   
     if (this.hash[nextPos.index] && !this.isFigurePoint(nextPos) 
         || (curY - 1) < 0) return false;
  }
  return true;
 };

 canMoveRight(){
   let curX;
   let curY; 
   let nextPos;
   for (var i = 0; i < this.state.currentFigure.points.length; i++) {
 	 curX = this.state.currentFigure.points[i].position.X;
     curY = this.state.currentFigure.points[i].position.Y;
     nextPos = this.indexToPosition(curX  * 10 + curY + 1);   
     if (this.hash[nextPos.index] && !this.isFigurePoint(nextPos)
     	|| (curY + 1) > 9) return false;
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
   if(this.canMoveDown() && maxXIndex < 19){  
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
  		sum += (arr[i].position.X + 1);

  	return Math.floor(sum/arr.length);
  };
  
  getAverageY(arr){
  	let sum = 0;
  	for (var i = 0; i < arr.length; i++) 
  		sum += (arr[i].position.Y + 1);
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
   	<div className="main">
     <div className="field-container">
      {elements}      
     </div>
     <Results/>
     </div>
   );
 };
}

export default App;
