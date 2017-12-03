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
           <div className= "score_num"> 2400</div>
           <ul>
            <li>
            <Link to={`/#`}           
            style={{ textDecoration: 'none',
                     color:'#888', 
                     fontSize: '35px'
                  }}>Main Menu</Link>
          </li>     
         </ul>
        
      </div>
    );
  }
}

export default ResualtRoute;
