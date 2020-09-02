var cell_size = 50;
class Cell{
   constructor(i,j){
       this.x = i;
       this.y = j;
       this.size = cell_size;
   }
    
   display(col){
     
      if(col == 0) fill(255);
      if(col == 1) fill(0);
     
      if(col == 2) fill(0,255,0);
      if(col == 3) fill(255,0,0);
     
      if(col == 4) fill(123,205,255);
      if(col == 5) fill(56,86,92);
      stroke(0);
      strokeWeight(1);
      rect(this.x,this.y,this.size,this.size);
   }
}

let cells = [];
let states = [];
let positions = new Array(4);
let g_size;
let isDone;
let canreset = true;

function setup() {
  fullscreen(true);
  createCanvas(2000,1200);
  g_size = 1000/cell_size;
  cells = new Array(g_size);
  states = new Array(g_size);
  resetSketch();  
  
  
  var reset = createButton('Reset');
  reset.mousePressed(resetSketch);
  reset.position(0,1100);
  reset.style("font-size","32px");
  
  
  var run = createButton('Run Breadth First Search')
  run.mousePressed(BFS);
  run.position(120,1100);
  run.style("font-size","32px");
  
}

function resetSketch(){
  if(canreset == false) return;
  isDone = false;
  
  positions[0] = floor(random(g_size));
  positions[1] = floor(random(g_size));
  
  positions[2] = floor(random(g_size));
  positions[3] = floor(random(g_size));
  
  if(positions[2] == positions[0] && positions[3] == positions[1]){
      if(positions[2] - 1 > 0) positions[2]--;
      else if(postions[2] + 1 < g_size) positions[2]++;
  }
  for(var i = 0; i < g_size; i++){
     cells[i] = new Array(g_size);
     states[i] = new Array(g_size);
  }
  
  for(i = 0; i < cells.length; i++){
      for(var j = 0; j < cells[i].length; j++){
         states[i][j] = 0;
         if(positions[0] == i && positions[1] == j)
             states[i][j] = 2;
         if(positions[2] == i && positions[3] == j)
             states[i][j] = 3;
         cells[i][j] = new Cell(i*cell_size,j*cell_size);
      }
  }
}

function drawCells(){
  for(var i = 0; i < cells.length; i++){
     for(var j = 0; j < cells[i].length; j++)
       cells[i][j].display(states[i][j]);
  }
}

function drawWalls(){
  if(mouseX >= 0 && mouseX <= 1000 && mouseY >= 0 && mouseY <= 1000 && mouseIsPressed == true && isDone == false){
       var x =floor(mouseX/cell_size);
       var y = floor(mouseY/cell_size);
      
       if((x == positions[0] && y == positions[1])){
           
       }
       else if((x == positions[2] && y == positions[3])){
         
       }
       else{
           states[x][y] = 1;
       }
  }
}

function valid(x,y){
   return (x >= 0 && x < cells.length && y >= 0 && y < cells.length); 
}

async function BFS(){
   
   if(isDone == true) return;
   else isDone = true;
   canreset = false;
   var q = new Queue();
   var vis = new Array(cells.length);
   for(var i = 0; i < vis.length; i++){
      vis[i] = new Array(cells[i].length); 
   }
  
  for(i = 0; i < vis.length;i++){
     for(var j = 0; j < vis[i].length; j++){
        vis[i][j] = false; 
        if(states[i][j] == 1)
            vis[i][j] = true;
     }
  }
  
  var dir = [[0,1], [1,0] , [-1,0] , [0,-1]];
  
  var sx = positions[0];
  var sy = positions[1];
  var ex = positions[2];
  var ey = positions[3];
  
  var found = false;
  
  vis[sx][sy] = true;
  var curr = [sx,sy];
  q.push(curr);
  
  while(q.size() >= 1){
      curr = q.front();
      q.pop();
      states[sx][sy] = 2;
      states[curr[0]][curr[1]] = 5;
      if(curr[0] == ex && curr[1] == ey){
         break; 
      }
      await sleep(1);
      for(i = 0; i < 4; i++){
         var x = curr[0] + dir[i][0];
         var y = curr[1] + dir[i][1];
         if(valid(x,y) && vis[x][y] == false){
              if(x == ex && y == ey){
                 found = true;
                 break;
              }
              vis[x][y] = true;
              states[x][y] = 4;
              let newCurr = [x,y];
              q.push(newCurr);
         }
      }
    
    if(found == true)
        break;
  }
  
  states[ex][ey] = 3;
  canreset = true;
}

function draw() {
  background(51);
  drawWalls();
  drawCells();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
