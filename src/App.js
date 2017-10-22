import React, { Component } from 'react';
import logo from './logo.svg';
import Element from './Element/Element'
import './App.css';

class App extends Component {

  createGrid(){
     let elems = [];
     for(let i = 0; i < 200; i++)
     	elems.push(<Element/>)
     return elems;

  }
  	
  render() {

    return (
      <div className="field-container">
        {this.createGrid()}
      </div>
    );
  }
}

export default App;
