import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import TetrisGrid from './TetrisGrid/TetrisGrid'
import MainMenu from './MainMenu/MainMenu'
import ResualtRoute from './ResualtRoute/ResualtRoute'
import AboutRoute from './AboutRoute/AboutRoute'

import './App.css';

class App extends Component {

  constructor(props) {
        super(props);        
        this.setScore = this.setScore.bind(this);

       
        this.state = {
            score: 0
        };
    }

   setScore(value) {
        this.setState({
            score: value
        });
    }

 render() { 
   return (
   	<div>   
   	<Switch>


      <Route exact path='/' component={MainMenu}/>
      <Route path='/game' exact render={(props) => (<TetrisGrid setScore={this.setScore} {...props}/>)}/>
      <Route path='/gameend' exact render={(props) => (<ResualtRoute score={this.state.score} {...props}/>)} />  
      <Route path='/about' component={AboutRoute}/>         
    </Switch>    
    </div>
   );
 };
}

export default App;
