import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import TetrisGrid from './TetrisGrid/TetrisGrid'
import MainMenu from './MainMenu/MainMenu'
import ResualtRoute from './ResualtRoute/ResualtRoute'
import AboutRoute from './AboutRoute/AboutRoute'
import ResualtTable from './ResualtTable/ResualtTable'


import './App.css';

class App extends Component {

  constructor(props) {
        super(props);        
        this.setScore = this.setScore.bind(this);
        let initialResualts = {
           0: {name: 'andy',   score: 10000 },
           1: {name: 'robert', score:  9000 },
           2: {name: 'kate',   score:  8000 },
           3: {name: 'tom',    score:  7000 },
           4: {name: 'bobby',  score:  6000 },
           5: {name: 'felics', score:  5000 },
           6: {name: 'men1006',score:  4000 },
           7: {name: 'lola',   score:  3000 },
           8: {name: 'asert',  score:  2000 },
           9: {name: 'wally',  score:  1000 }
        };
       
        this.state = {
            score: 0,
            table: initialResualts
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
      <Route path='/table' exact render={(props) => (<ResualtTable resualtTable={this.state.table} {...props}/>)} />         
    </Switch>    
    </div>
   );
 };
}

export default App;
