import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './ResualtRoute.css';

class ResualtRoute extends Component {
  constructor(props){
    super(props);  
    
    this.state = {  	
  		grid: 1,
      inputValue: ''
  	};
    this.submitScore = this.submitScore.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  };
  
  updateInputValue(e){
    this.setState({
      inputValue: e.target.value
    });
  };  

  submitScore(e){      
    this.props.addResualt({name: this.state.inputValue,   score: this.props.score });
  };

  render() {  	
  	
    return (
      <div className = "resualts">
           <div className= "score"> Your Score:</div>
           <div className= "score_num">{this.props.score}</div>
           <div className = "nameWrapper"> <input className='name' value={this.state.inputValue} onChange={this.updateInputValue} placeholder='Enter your name' /></div>
           <ul>
            <li>
            <Link to={`/table`}           
            style={{ textDecoration: 'none',
                     color:'#eee', 
                     fontSize: '35px'
                  }}
            onClick={this.submitScore}>Submit</Link>
          </li>     
         </ul>
        
      </div>
    );
  }
}

export default ResualtRoute;
