import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './ResualtTable.css';

class ResualtTable extends Component {
       
  render() {  
    let rows = [];	
     
    for (var i = 0; i < 10; i++){
      let rowID = `row${i}`
      let cell = []
     
      for (let idx = 0; idx < 3; idx++){
        let cellID = `cell${i}-${idx}`;       
        if(idx === 0)cell.push(<td className="cell number" key={cellID} id={cellID}>{i + 1}</td>)
        else if(idx === 1) cell.push(<td className="cell" key={cellID} id={cellID}>{this.props.resualtTable[i].name}</td>)
        else cell.push(<td className="cell" key={cellID} id={cellID}>{this.props.resualtTable[i].score}</td>)
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
