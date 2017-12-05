import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './ResualtTable.css';

class ResualtTable extends Component {
  constructor(props){
    super(props);   
    this.posX = this.props.posX;
    this.posY = this.props.posY;      
  };
     
  render() {  
    let rows = [];	
    return (
      <div className = "resualtable">
         <table>

         </table>

         <Link to={`/#`}           
            style={{ textDecoration: 'none',
                     color:'#eee', 
                     fontSize: '35px'
                  }}
          >Main Menu</Link>
         
      </div>
    );
  }
}

export default ResualtTable;
