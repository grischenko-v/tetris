import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import TetrisGrid from './TetrisGrid/TetrisGrid'
import MainMenu from './MainMenu/MainMenu'
import './App.css';

class App extends Component {


 render() { 
   return (
   	<div>   
   	<Switch>
      <Route exact path='/' component={MainMenu}/>
      <Route path='/game' component={TetrisGrid}/>      
    </Switch>    
    </div>
   );
 };
}

export default App;
