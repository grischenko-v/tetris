import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import TetrisGrid from './TetrisGrid/TetrisGrid'

import './App.css';

class App extends Component {


 render() { 
   return (
   	<div>
      <TetrisGrid/>
     </div>
   );
 };
}

export default App;
