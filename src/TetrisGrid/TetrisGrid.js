import React, { Component } from 'react';
import Element from '../Element/Element'
import Results from '../Results/Results'
import './TetrisGrid.css';

class TetrisGrid extends Component {

  constructor(){
  	super();
  	this.frameCount = 0; 
  	this.sizeX = 10;
  	this.sizeY = 20;
  	this.hash = this.initGrid();
  	this.state = {  	
  		grid: this.hash,
  		frameId: "",
        currentFigure: "",
        nextFigure: "",
        result: 0,
        gameEnd: false,
        fps: 80
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
  	if(!this.state.currentFigure || this.state.gameEnd) return;  
    switch(e.keyCode){
      case 	39:{            
        if(this.canMoveRight()){
          for (let i = 0; i < newFigure.points.length; i++) {      
            this.hash[newFigure.points[i].position.index] = false;       
            newFigure.points[i].position  = Results.indexToPosition(newFigure.points[i].position.X  * 10 + (newFigure.points[i].position.Y + 1), this.sizeX);
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
           newFigure.points[i].position  = Results.indexToPosition(newFigure.points[i].position.X  * 10 + (newFigure.points[i].position.Y - 1), this.sizeX);
         } 
         for (let i = 0; i < newFigure.points.length; i++)  this.hash[newFigure.points[i].position.index] = true;
          this.setState({   	 
            grid: this.hash,
            createFigure: newFigure
          });
        }
        break;
      }     
      case  32:  {           
        while(this.canMoveDown()) this.moveDown();
        break;
      }
      case  40:  {           
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
    let frameId;
    let newFps = this.state.fps;
    let result = this.state.result;
    frameId = this.state.gameEnd ? window.cancelAnimationFrame( this.state.frameId ) : window.requestAnimationFrame( this.animationloop );
  
    if(this.frameCount < this.state.fps) {
      this.frameCount++;        
    }
    else{
    	this.frameCount = 0;
        if(!this.state.currentFigure){   
          f = this.checkFullLine();
         
          result += f * 100;      
          if(result <= 100) newFps = 80;
          else if(result <=  500 && result >  100 ) newFps = 70;
          else if(result <= 1000 && result >  500 ) newFps = 60;
          else if(result <= 1500 && result > 1000 ) newFps = 50;
          else if(result <= 2000 && result > 1500 ) newFps = 40;
          else if(result <= 2500 && result > 2000 ) newFps = 35;
          else if(result <= 3000 && result > 2500 ) newFps = 30;
          else if(result <= 3500 && result > 3000 ) newFps = 25;
          else if(result <= 4000 && result > 3500 ) newFps = 20;
          else if(result <= 4500 && result > 4000 ) newFps = 18;
          else if(result <= 5000 && result > 4500 ) newFps = 15;
          else if(result <= 5500 && result > 5000 ) newFps = 13;
          else if(result <= 6000 && result > 5500 ) newFps = 10;
          else if(result <= 6500 && result > 6000 ) newFps = 8;
          this.createFigure();         
          if(this.state.gameEnd) return;
          if(!this.canMoveDown()){
          	console.log("Game End"); 
            this.props.history.push('/gameend')          
            this.setState({    
               gameEnd: true
              });
          }
        }
        else{
         this.moveDown();      
        }  	   	  
    }
    this.setState({    
       grid:  newGrid,
       result: result,
       frameId: frameId,
       fps: newFps
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
      coords.position = Results.indexToPosition(xPos  + yPos * 10, this.sizeX);   
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
      coords.position = Results.indexToPosition(xPos  + yPos * 10, this.sizeX);   
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
    let name = "GRight";   
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
      coords.position = Results.indexToPosition(xPos  + yPos * 10, this.sizeX);   
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
    let name = "GLeft"; 
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
      coords.position = Results.indexToPosition(xPos  + yPos * 10, this.sizeX);   
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
    let name = "ZRight";  
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
      coords.position = Results.indexToPosition(xPos  + yPos * 10, this.sizeX);   
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
    let name = "ZLeft";
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
      coords.position = Results.indexToPosition(xPos  + yPos * 10, this.sizeX);   
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
    let name = "Ep";    
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
      coords.position = Results.indexToPosition(xPos  + yPos * 10, this.sizeX);   
      points.push(coords);
     }        
    return {
    	 name: name,
         points: points        
    };
 };

 getRandomFigure(){
   let figure;  
   switch(Math.floor(Math.random() * 7)){
     case 0 : figure = this.createRect();   break;      
     case 1 : figure = this.createLine();   break;    
     case 2 : figure = this.createGRight(); break; 
     case 3 : figure = this.createGLeft();  break; 
     case 4 : figure = this.createZRight(); break; 
     case 5 : figure = this.createZLeft();  break;
     case 6 : figure = this.createEp();     break; 
     default: break; 
   };  

   return figure;
 };

 createFigure(){
   let figurePos;  
   let nextFigurePos;
   if(this.state.nextFigure === "") figurePos = this.getRandomFigure();
   else figurePos = Results.cloneFigure(this.state.nextFigure);

   nextFigurePos = this.getRandomFigure();  

   for (let i = 0; i < figurePos.points.length; i++) this.hash[figurePos.points[i].position.index] = true;
   
   this.setState({    
        currentFigure: figurePos,
        nextFigure:  nextFigurePos,
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
     
      let position = Results.indexToPosition(i, this.sizeX);
      if(this.hash[position.index]){
          curLine.push(position);      
      }     
      if(curLine.length > 9){        
        for (let j = 0; j < curLine.length; j++) {
          this.hash[curLine[j].index] = false;          
        }        
         fullLines++; 
         this.moveAllDown(lineNum);    
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
     let temp = Results.indexToPosition(i, this.sizeX);
   	 newHash[temp.index] = this.hash[temp.index];
   } 
   for (let i = 0; i < this.sizeX * (lines); i++) {
     let temp = Results.indexToPosition(i, this.sizeX);
   	 newHash[temp.index] = false;
   } 		
   for (let i = 0; i < this.sizeX * (lines); i++) {
     curPos = Results.indexToPosition(i, this.sizeX);
     nextPos = Results.indexToPosition(i + 10, this.sizeX);  
     if (this.hash[curPos.index] && this.hash[nextPos.index] !== undefined) {
        newHash[nextPos.index] = true;        
     }
   }
   this.hash = newHash;

 };

 _rotateFigure(e){ 	
 	if (e.keyCode === 38 && this.state.currentFigure) {
  	  let newFigure = this.state.currentFigure;
      let x0 = this.getAverageX(newFigure.points);
      let y0 = this.getAverageY(newFigure.points);    
         
      let newXMas = [];
      let newYMas = [];

      for (let i = 0; i < newFigure.points.length; i++) {
        let newX = x0 - newFigure.points[i].position.Y + y0;
        let newY = y0 + newFigure.points[i].position.X - x0;
        if(newX > 19 || newX < 0 || newY > 9 || newY < 0 
           || this.hash[Results.indexToPosition(newX * 10 + newY, this.sizeX)]) return ;
        else{
         newXMas.push(newX);
         newYMas.push(newY);
        }
      }

      for (let i = 0; i < this.state.currentFigure.points.length; i++)
    	this.hash[this.state.currentFigure.points[i].position.index] = false;       
        
      for(let i = 0; i < newFigure.points.length; i++)
       	newFigure.points[i].position = Results.indexToPosition(newXMas[i] * 10 + newYMas[i], this.sizeX);
      
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
   if(!this.state.currentFigure) return;
   for (var i = 0; i < this.state.currentFigure.points.length; i++) {
 	 curX = this.state.currentFigure.points[i].position.X;
     curY = this.state.currentFigure.points[i].position.Y;
     nextPos = Results.indexToPosition((curX + 1) * 10 + curY, this.sizeX);   
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
     nextPos = Results.indexToPosition(curX  * 10 + curY - 1, this.sizeX);   
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
     nextPos = Results.indexToPosition(curX  * 10 + curY + 1, this.sizeX);   
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
         newFigure.points[i].position  = Results.indexToPosition((newFigure.points[i].position.X + 1) * 10 + newFigure.points[i].position.Y, this.sizeX);
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
       temp = Results.indexToPosition(i, this.sizeX);
       elems[temp.index] = false;     	
     }       
     return elems;
  }; 

 
  createGrid(){   
   let elements = [];  
   let temp;  
   for(let i = 0; i < this.sizeX * this.sizeY; i++){
     temp = Results.indexToPosition(i, this.sizeX);   

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
     <Results result = {this.state.result} nextFigure = {this.state.nextFigure}/>
     </div>
   );
 };
}

export default TetrisGrid;
