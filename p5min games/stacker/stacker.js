const DIMENSIONS = { width: 540, height: 720 };
const WIDTH = 7; 
const STARTING_WIDTH = 3; 
const MID_HEIGHT = Math.floor(DIMENSIONS.height / (DIMENSIONS.width / WIDTH) / 2);
var grid = []; 
var score;
var playing; 

function setup(){
	createCanvas(DIMENSIONS.width, DIMENSIONS.height);
	initializeGrid();
	score = 0;
	playing = true;
	frameRate(5); 
    textAlign(CENTER);
    textSize(50);
}

function draw(){
	background(51);
    handleGrid();
	drawScore();
    drawGameOver();
}

function keyPressed(){
	if(keyCode != 32)
		return;
	var y = grid.length - 1;
	var cellCount = grid[y].stop(grid[y - 1]);
	if(cellCount < 1){
		endGame();
		return;
	}
	frameRate(5 + score);
	if(++y > MID_HEIGHT) {
		for(var i = 0; i < y; i++){
			grid[i].y--;
		}
	}
	score = y;
	grid.push(new Row((y > MID_HEIGHT) ? MID_HEIGHT : y, cellCount));
}

function handleGrid(){
	var size = width / WIDTH; 
	fill("#FF0000");
	stroke(255);
	strokeWeight(3);
	for(var y = 0; y < grid.length; y++){
		if(grid[y].dynamic) {
			grid[y].update();
		}
	grid[y].draw(size);
	}
}

function drawScore(){
	noStroke();
    fill("#FFFF00");
    text(score, width / 2, 70);
}

function endGame(){
	noLoop();
	playing = false;
}

function drawGameOver(){
	if(!playing){
		noStroke();
	    fill("#FFFF00");
	    textSize(90);
	    text("Game Over!", width / 2, height / 2);
	    textSize(50);
	}
}

function initializeGrid(){
	grid = [];
	grid.push(new Row(0, STARTING_WIDTH));
}