import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './AboutRoute.css';

class AboutRoute extends Component {
  constructor(props){
    super(props);  
   
  };

  render() {  	
  	
    return (
      <div className = "about">
        <div className = "controls">
          <h1>Controls</h1>  
          <p>Arrow Left - move left.</p>
          <p>Arrow Right - move right.</p>
          <p>Arrow Down - move down.</p>
          <p>Arrow Up - routate figure.</p>
          <p>Space - fast move down.</p>
          <p>Create by Vladimir Grischenko.</p>
        </div>

        <ul>      
          <li>
            <Link to={`/`}           
            style={{ textDecoration: 'none',
                     color:'#888', 
                     fontSize: '35px'
                  }}>Back</Link>
          </li>     
        </ul>
      </div>
    );
  }
}

export default AboutRoute;
