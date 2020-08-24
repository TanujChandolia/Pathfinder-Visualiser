let c_size = 40;
let cells = [];
let states = [];

var startx ,starty , endx ,endy;
class Cell{
   constructor(i,j) {
     this.size = c_size;
     this.x = i;
     this.y = j;
   }
  
  
  display(col){
    if(col == 0) fill(255);
    if(col == 1) fill(0);
    if(col == 2) fill(100,200,0);
    if(col == 3) fill(0,206,209);
    if(col == 4) fill(255,127,0);
    if(col == 5) fill(255,0,0);
    stroke(0);
    strokeWeight(3);
    
    rect(this.x,this.y,this.size,this.size);
  }
}

var notPressed = true;
let size;

function setup() {
  var w = (windowWidth - windowWidth%c_size) - c_size;
  var h = (windowHeight - windowHeight %c_size) - c_size;
  createCanvas(w,h);
  
  size = floor(w/c_size);
  startx = floor(random(size));
  starty = floor(random(size-10));
  endx = floor(random(size));
  endy = floor(random(size-10));
  
  print(startx,starty,endx,endy);
  cells = new Array(size);
  states = new Array(size);
  
  for(var i = 0; i < size; i++){
    cells[i] = new Array(size);
    states[i] = new Array(size);
  }
  
  for(i = 0; i < cells.length; i++){
     for(var j = 0;  j < cells[i].length; j++){
        states[i][j] = 0;
        if(i == startx && j == starty || i == endx && j == endy)
            states[i][j] = 2;
        cells[i][j] =  new Cell(i*c_size,j*c_size);
     }
  }
  
  
  var button = createButton('Start Breadth First Search');
  button.size(800,50);
  button.position(0,height+10);
  button.mousePressed(BFS);
  
}

function valid(x,y){
   return (x >= 0 && x < size && y >= 0 && y < size);
}
async function BFS(){
   if(notPressed == false) return;
   else notPressed = false;
  
   var q = new Queue();
   let vis = new Array(size);
   let directions = [[1,0], [0,1], [-1,0], [0,-1]];
  
   for(var i = 0; i < vis.length; i++){
      vis[i] = new Array(size); 
   }
  
   for(i = 0; i < size; i++){
      for(var j = 0; j < size; j++){
         vis[i][j] = false;
         if(states[i][j] == 1)
           vis[i][j] = true;
      }
   }
  
  
  vis[startx][starty] = true;
  let curr = [startx,starty];
  q.push(curr);
  var found = false;
  
  
  while(q.size() >= 1){
      curr = q.top();
      q.pop();
      if(curr[0] == endx && curr[1] == endy)
          break;
      states[curr[0]][curr[1]] = 4;
      await sleep(0);
      for(i = 0; i < 4; i++){
          var x = curr[0] + directions[i][0];
          var y = curr[1] + directions[i][1];
          if(x == endx && y == endy){
            states[startx][starty] = 2;
            states[x][y] = 5;
            found = true;  
            break;
          }
          if(valid(x,y) && vis[x][y] == false){
             
             vis[x][y] = true;
             states[x][y] = 3;
             q.push([x,y]);
          }
      }
      
    
    if(found == true) {
      break;
    }
  }
  
}

function draw() {
  background(51);
  
  if(mouseIsPressed == true){
     if(mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0){
        var x = floor(mouseX/c_size);
        var y = floor(mouseY/c_size);
       
        if(x == startx && y == starty || x == endx && y == endy)
            states[x][y] = 2;
        else
            states[x][y] = 1;
     }
  }
  
  
  for(var i = 0; i < cells.length; i++){
    for(var j = 0; j < cells[i].length; j++){
      cells[i][j].display(states[i][j]);
    }
  }   
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
