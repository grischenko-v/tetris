import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './AboutRoute.css';

class AboutRoute extends Component {
  
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
          <p className = "author">Create by Vladimir Grischenko.</p>
        </div>

        <ul>      
          <li>
            <Link to={`/`}           
            style={{ textDecoration: 'none',
                     color:'#fff', 
                     fontSize: '35px',
                     marginTop: '50px',
                     float: 'left'
                  }}>Back</Link>
          </li>     
        </ul>
      </div>
    );
  }
}

export default AboutRoute;
