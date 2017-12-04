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
                     fontSize: '35px',
                     width: '100px',
                     margin: '0 auto' 
                  }}>Play</Link>
          </li>
          <li>
            <Link to={``} 
            style={{ textDecoration: 'none',
                     color:'#aaa',
                     fontSize: '35px',
                     margin: '0 auto' 
            }}>Resualts</Link>
          </li>
          <li>
            <Link to={`about`} 
            style={{ textDecoration: 'none',
                     color:'#eee',
                     fontSize: '35px',
                     margin: '0 auto' 
            }}>About</Link>
          </li>     
     
    </ul>
      </div>
    );
  }
}

export default MainMenu;
