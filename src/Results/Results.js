import React, { Component } from 'react';
import './Results.css';


class Results extends Component {
  constructor(props){
    super(props);  
       console.log(this.props.result)
  };
     
  render() {  	
    return (
      <div className = "resultsblock">
         <div className = "resualt">{this.props.result}</div>
         <div className = "nextfigure"></div>
      </div>
    );
  }
}

export default Results;
