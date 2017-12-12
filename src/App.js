import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import TetrisGrid from './TetrisGrid/TetrisGrid';
import MainMenu from './MainMenu/MainMenu';
import ResualtRoute from './ResualtRoute/ResualtRoute';
import AboutRoute from './AboutRoute/AboutRoute';
import ResualtTable from './ResualtTable/ResualtTable';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);   
    
    let initialResualts = JSON.parse(localStorage.getItem('resualtTable')); 

    if(initialResualts === null)
      initialResualts = 
    {
         0: {name: 'andy',   score:  8000 },
         1: {name: 'robert', score:  7500 },
         2: {name: 'kate',   score:  7000 },
         3: {name: 'tom',    score:  6500 },
         4: {name: 'bobby',  score:  6000 },
         5: {name: 'felics', score:  5000 },
         6: {name: 'kate',   score:  4000 },
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
     if(this.state.table[i].score > newResualt.score )
       newResualts[i] = this.state.table[i];
     else {
       newResualts[i] = newResualt;
       newResPosition = i + 1;         
       break;
     }
   }
   for (let i = newResPosition; i < 10; i++) {
     newResualts[i] = this.state.table[i - 1];
   }
   localStorage.setItem('resualtTable', JSON.stringify(newResualts));
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
   	  <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper">
        <Route exact path='/' component={MainMenu}/>
        <Route path='/game' exact render={(props) => (<TetrisGrid setScore={this.setScore} {...props}/>)}/>
        <Route path='/gameend' exact render={(props) => (<ResualtRoute score={this.state.score} addResualt={this.addResualt} {...props}/>)} />  
        <Route path='/about' component={AboutRoute}/>
        <Route path='/table' exact render={(props) => (<ResualtTable resualtTable={this.state.table} {...props}/>)} />         
      </AnimatedSwitch>     
    </div>
   );
   };
  }

export default App;
