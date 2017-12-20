import Results from '../Results/Results';

function createFigure(aName, sizeX, posX = 5){
    let points = [];
    let xPos = posX;
    let yPos = 0;
    let name = aName;
    let coords;    
     for (let i = 0; i < 4; i++) {
      coords = {};
      switch(i){
        case 0  : break;
        case 1  :  
          if(name === "Rect" || name === "GRight" || name === "Ep")  xPos++; 
          if(name === "Line" || name === "ZRight" || name === "ZLeft") yPos++; 
          if(name === "GLeft") xPos--; 
          break;
       
        case 2  :
          if(name === "Rect"  || name === "GRight" || name === "ZRight" || name === "Ep") xPos--; 
          if(name === "Rect" || name === "Line"  || name === "GRight" || name === "GLeft" || name === "Ep") yPos++; 
          if(name === "GLeft" || name === "ZLeft") xPos++;
          break;  
        case 3  :
          if(name === "Rect")  xPos++; 
          if(name === "Line"  || name === "GRight" || name === "GLeft") yPos++;  
          if(name === "ZRight" || name === "ZLeft" || name === "Ep") yPos--;
          if(name === "Ep") xPos--; 
          if(name === "ZLeft") xPos = xPos - 2;
          if(name === "ZRight") xPos = xPos + 2;
          break;
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
   switch(Math.floor(Math.random() * 7 )){
     case 0 : figure = createFigure("Rect", sizeX, 4);   break;      
     case 1 : figure = createFigure("Line", sizeX);   break;    
     case 2 : figure = createFigure("GRight", sizeX); break; 
     case 3 : figure = createFigure("GLeft", sizeX);  break; 
     case 4 : figure = createFigure("ZRight", sizeX); break; 
     case 5 : figure = createFigure("ZLeft", sizeX);  break;
     case 6 : figure = createFigure("Ep", sizeX);     break; 
     default: break; 
   };  

   return figure;
 };

export {getRandomFigure};