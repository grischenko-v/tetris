import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import TetrisGrid from './TetrisGrid/TetrisGrid'
import MainMenu from './MainMenu/MainMenu'
import ResualtRoute from './ResualtRoute/ResualtRoute'
import AboutRoute from './AboutRoute/AboutRoute'
import ResualtTable from './ResualtTable/ResualtTable'
import Element from './Element/Element'

import './App.css';

class App extends Component {

  constructor(props) {
        super(props);        

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
        this.setScore = this.setScore.bind(this);
        this.addResualt = this.addResualt.bind(this);
    };

   addResualt(newResualt){     
     let newResualts = this.cloneFigure(this.state.table);
     let newResPosition;
     for (let i = 0; i < 10; i++) {   
       if(this.state.table[i].score 
        > newResualt.score )
           newResualts[i] = this.state.table[i];
       else {
           newResualts[i] = newResualt;
           newResPosition = i + 1;
           console.log(newResPosition);
           break;
       }
     }
     for (let i = newResPosition; i < 10; i++) {
        newResualts[i] = this.state.table[i - 1];
     }
     this.setState({
             table: newResualts
        });

   };

   setScore(value) {
        this.setState({
            score: value
        });
    };


  cloneFigure(obj) {
    if (null == obj || "object" !== typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
 };

 render() { 
   return (
   	<div>   
   	<Switch>


      <Route exact path='/' component={MainMenu}/>
      <Route path='/game' exact render={(props) => (<TetrisGrid setScore={this.setScore} {...props}/>)}/>
      <Route path='/gameend' exact render={(props) => (<ResualtRoute score={this.state.score} addResualt={this.addResualt} {...props}/>)} />  
      <Route path='/about' component={AboutRoute}/>
      <Route path='/table' exact render={(props) => (<ResualtTable resualtTable={this.state.table} {...props}/>)} />         
    </Switch>    
    </div>
   );
 };
}

export default App;
