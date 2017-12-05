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

    for (var i = 0; i < 10; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < 2; idx++){
        let cellID = `cell${i}-${idx}`
        cell.push(<td key={cellID} id={cellID}></td>)
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return (
      <div className = "resualtable">
          <table id="simple-board">
               <tbody>
                 {rows}
               </tbody>
             </table>
          
            <Link to={`/`}           
            style={{ textDecoration: 'none',
                     color:'#fff', 
                     fontSize: '35px',                     
                     float: 'left',
                     marginTop: '50px',
                     marginLeft: '45px'
                  }}>Back</Link>
       
         
      </div>
    );
  }
}

export default ResualtTable;
