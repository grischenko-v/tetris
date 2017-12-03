import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MainMenu.css';

class MainMenu extends Component {
  constructor(props){
    super(props);  
    
    this.state = {  	
  		grid: 1  		
  	};
  };

  render() {  	
  	
    return (
      <div className = "mainmenu">
           <ul>      
          <li>
            <Link to={`/game`}           
            style={{ textDecoration: 'none',
                     color:'#888', 
                     fontSize: '35px'
                  }}>Play</Link>
          </li>
          <li>
            <Link to={``} 
            style={{ textDecoration: 'none',
                     color:'#888',
                     fontSize: '35px' 
            }}>Resualts</Link>
          </li>
          <li>
            <Link to={`about`} 
            style={{ textDecoration: 'none',
                     color:'#888',
                     fontSize: '35px' 
            }}>About</Link>
          </li>     
     
    </ul>
      </div>
    );
  }
}

export default MainMenu;
