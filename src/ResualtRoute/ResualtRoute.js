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

  submitScore(e){  
    console.log(this.props.score);
  }


  render() {  	
  	
    return (
      <div className = "resualts">
           <div className= "score"> Your Score:</div>
           <div className= "score_num">{this.props.score}</div>
           <div className = "nameWrapper"> <input className='name' placeholder='Enter your name' /></div>
           <ul>
            <li>
            <Link to={`/table`}           
            style={{ textDecoration: 'none',
                     color:'#eee', 
                     fontSize: '35px'
                  }}
            onClick={this.submitScore()}   >Submit</Link>
          </li>     
         </ul>
        
      </div>
    );
  }
}

export default ResualtRoute;
