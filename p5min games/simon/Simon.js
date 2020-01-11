const SIZE = 175; 
var pattern = []; 
var tiles = [];
var input = []; 
var time;
var dIndex; 
var score; 
var demonstrating; 
var playing; 

function setup(){
  createCanvas(500, 500);
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      var col = randomTileColor(i, j);
      var brightCol = brightenCol(col);
			var x = i * SIZE + SIZE;
			var y = j * SIZE + SIZE;
      tiles.push(new Tile(x, y, SIZE, col, brightCol));
    }
  }
  playing = true;
  score = -1;
  newTile();
  textAlign(CENTER);
}

function draw(){
   background(51);
   handleTiles();
   handleDemonstration();
   drawScore();
  if (!playing)
		drawGameEnd();
}

function mousePressed(){
	  if (demonstrating) 
         return;
  var t = getTile(tiles, mouseX, mouseY); 
  if (t != -1) 
    input.push(t);
  for (var i = 0; i < input.length; i++) {
    if (input[i] != pattern[i])
      endGame();
  }
  if (input.length === pattern.length) 
    newTile();
}

function newTile(){
  pattern.push(Math.floor(random() * tiles.length));
	demonstrating = true; 
	var negativeInput = (-input[input.length - 1]) ? -input[input.length - 1] : 1; 
	dIndex = negativeInput - 1; 
	time = 0; 
	input = []; 
	score++;
}

function endGame(){
	playing = false;
	noLoop();
}

function drawGameEnd(){
	textSize(30);
	fill(255);
	text(score, width / 2, height - 50);
}

function handleTiles(){
	for (var i = 0; i < tiles.length; i++) {

    if (demonstrating && dIndex > -1) {

      tiles[i].draw(i === pattern[dIndex]); 
    } else if (demonstrating) {

			tiles[i].draw(i === (-dIndex - 1)); 
		} else {

      tiles[i].draw(i === input[input.length - 1]); 
    }
  }
}

function handleDemostration(){
	time++;
	if(demonstrating && time % 60 === 0 ) {
		if (dIndex > -1) {
			dIndex++; 
		} else if (dIndex === (-tiles.length - 1)) {
			dIndex = 0; 
		} else {
			dIndex = (-tiles.length - 1); 
		}
	}

  if (dIndex >= pattern.length) {
    demonstrating = false;
	}
}

function randomTileColor(i, j){
	var r = (i % 2 === 0) ? 0 : random(155) + 50;
	var g = (j % 2 === 0) ? 0 : random(155) + 50;
	var b = random(155) + 50;

	return color(r, g, b);
}

function brightenCol(col){
	return color(red(col) + 50, green(col) + 50, blue(col) + 50);
}