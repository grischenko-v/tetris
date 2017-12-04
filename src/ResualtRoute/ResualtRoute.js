import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './ResualtRoute.css';

class ResualtRoute extends Component {
  constructor(props){
    super(props);  
    
    this.state = {  	
  		grid: 1  		
  	};
  };

  render() {  	
  	
    return (
      <div className = "resualts">
           <div className= "score"> Your Score:</div>
           <div className= "score_num">{this.props.score}</div>
           <ul>
            <li>
            <Link to={`/#`}           
            style={{ textDecoration: 'none',
                     color:'#888', 
                     fontSize: '35px',
                     margin: '0 auto' 
                  }}>Main Menu</Link>
          </li>     
         </ul>
        
      </div>
    );
  }
}

export default ResualtRoute;
