import React, { Component } from 'react';
import Element from './Element/Element'
import './App.css';

class App extends Component {

  constructor(){
  	super();
  	this.sizeX = 10;
  	this.sizeY = 20;
  	this.state = {
  		grid: this.createGrid(),
  		frameId: ""
  	};    
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.updateGrid = this.updateGrid.bind(this);  
  };
    
  start(){
   if( !this.state.frameId ) {
    this.setState({
        frameId: window.requestAnimationFrame( this.updateGrid ),
        isDie: false
      });     
     }
  };

 stop(){
    window.cancelAnimationFrame( this.state.frameId );
 };
 
 updateGrid(){
  this.setState({          
    frameId: window.requestAnimationFrame( this.updateGrid )
   }); 
  };

  createGrid(){
     let elems = [];
     let xPos = 0;
     let yPos = 0;
     for(let i = 0; i < this.sizeX * this.sizeY; i++){
     	elems.push(<Element posX = {xPos} posY = {yPos} key = {i}/>)     	
        if(xPos < 9) xPos++;
        else {
        	xPos = 0;
        	yPos++;
        }     
     }     
     return elems;
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
