import Results from '../Results/Results';
function createRect(sizeX){
    let points = [];
    let xPos = 4;
    let yPos = 0;
    let name = "Rect";
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                 break;
        case 1  : 
        case 3  : xPos++;         break;
        case 2  : xPos--; yPos++; break;  
        default: break;          
      }      
      coords.num = i;
      coords.position = Results.indexToPosition(xPos  + yPos * 10, sizeX);   
      points.push(coords);
     }        
    return {
    	 name: name,
       points: points        
    };
 };

 function  createLine(sizeX){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "Line";   
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :         break;           
        case 1  : yPos++; break;
        case 2  : 
        case 3  : yPos++; break;  
       default: break;          
      }     
      coords.num = i;
      coords.position = Results.indexToPosition(xPos  + yPos * 10, sizeX);   
      points.push(coords);
     }        
    return {
    	 name: name,
       points: points        
    };
 };
  
 function createGRight(sizeX){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "GRight";   
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                 break;           
        case 1  : xPos++;         break;
        case 2  : xPos--; yPos++; break;
        case 3  : yPos++;         break;  
       default: break;          
      }     
      coords.num = i;
      coords.position = Results.indexToPosition(xPos  + yPos * 10, sizeX);   
      points.push(coords);
     }        
    return {
    	 name: name,
       points: points        
    };
 }; 

function  createGLeft(sizeX){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "GLeft"; 
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                 break;           
        case 1  : xPos--;         break;
        case 2  : xPos++; yPos++; break;
        case 3  : yPos++;         break;  
       default: break;          
      }     
      coords.num = i;
      coords.position = Results.indexToPosition(xPos  + yPos * 10, sizeX);   
      points.push(coords);
     }        
    return {
    	 name: name,
       points: points        
    };
 }; 

function createZRight(sizeX){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "ZRight";  
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                          break;           
        case 1  : yPos++;                  break;
        case 2  : xPos--;                  break;
        case 3  : yPos--; xPos = xPos + 2; break;  
       default: break;          
      }     
      coords.num = i;
      coords.position = Results.indexToPosition(xPos  + yPos * 10, sizeX);   
      points.push(coords);
     }        
    return {
    	 name: name,
       points: points        
    };
 };

function createZLeft(sizeX){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "ZLeft";
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                          break;           
        case 1  : yPos++;                  break;
        case 2  : xPos++;                  break;
        case 3  : yPos--; xPos = xPos - 2; break;  
       default: break;          
      }     
      coords.num = i;
      coords.position = Results.indexToPosition(xPos  + yPos * 10, sizeX);   
      points.push(coords);
     }        
    return {
    	 name: name,
       points: points        
    };
 };
 
function createEp(sizeX){
    let points = [];
    let xPos = 5;
    let yPos = 0;
    let name = "Ep";    
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  :                 break;           
        case 1  : xPos++;         break;
        case 2  : xPos--; yPos++; break;
        case 3  : yPos--; xPos--; break;  
       default: break;          
      }     
      coords.num = i;
      coords.position = Results.indexToPosition(xPos  + yPos * 10, sizeX);   
      points.push(coords);
     }        
    return {
    	 name: name,
       points: points        
    };
 };


function getRandomFigure(sizeX){
   let figure;  
   switch(Math.floor(Math.random() * 7)){
     case 0 : figure = createRect(sizeX);   break;      
     case 1 : figure = createLine(sizeX);   break;    
     case 2 : figure = createGRight(sizeX); break; 
     case 3 : figure = createGLeft(sizeX);  break; 
     case 4 : figure = createZRight(sizeX); break; 
     case 5 : figure = createZLeft(sizeX);  break;
     case 6 : figure = createEp(sizeX);     break; 
     default: break; 
   };  

   return figure;
 };

export {getRandomFigure};