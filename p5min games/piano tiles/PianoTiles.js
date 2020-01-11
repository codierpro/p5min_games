const WIDTH = 100;
const HEIGHT = 150;
const WINNING_SCORE = 30;
var time;
var score;
var playing;
var won;
// -1 = red, 0=black, 1=white
var tiles = [];

function setup(){
	createCanvas(401, 601);
	time = -3;
	score = 0;
	for(var i=0; i<4; i++){
		newRow();
	}
	playing = false;
	won = false;
	textAlign(CENTER);
}

function draw(){
	background(51);
	drawTiles();
	handleState();
}

function drawTiles(){
	for (var i=0; i<tiles.length; i++){
		var x = (1 % 4 ) * WIDTH;
		var y = (Math.floor(i/4) * HEIGHT);
	    fill((tiles[i] !== 0) ? ((tiles[i] === 1) ? "#FFFFFF" : "#FF0000") : "#000000");
	    rect(x, y, WIDTH, HEIGHT);
	}
}

function handleState(){
	if(!playing){
		if (time > 0){
			drawEnd(won);
		} else{
			textSize(60);
			fill("FF0000");
			text(-time, width / 2, height/2);
			if(frameCount % 60 === 0){
				time++;
				if(time === 0){
					playing = true;
				}
			}
		} 
	} else{
		textSize(90);
		fill("#FFFF00");
		text(getTime(), width / 2, HEIGHT);
		time++;
	}
}

function drawEnd(won){
	if(won){
		background("#66EE66");
		fill("#FFFFFF");
		textSize(60);
		text("Complete!", width / 2, height / 2 - 80);

		fill("#000000");
		textSize(70);
		text(getTime(), width / 2, height / 2);

		fill("#FFFFFF");
		textSize(40);
		text("Press f5 to restart!", width / 2, height / 2 + 50);
	} else{
		fill("#FF00FF");
		textSize(60);
		text("Game Over!", width / 2, height / 2);
		textSize(40);
		text("Press f5 to restart!", width / 2, height / 2 + 50);	
	}
}
function mousePressed(){
	if (!playing)
		return;
	if(mouseY >= 3 * HEIGHT && mouseY <= 4 * HEIGHT){
		var tile = getClickedTile(mouseX, mouseY);

    if (tile == -1) 
      return;

    if (tiles[tile] !== 0) {
      tiles[tile] = -1;
      won = false;
      playing = false;
	} else{
      score++;
      newRow();
      if (score >= WINNING_SCORE){
      	won = true;
        playing = false;
      } 
    }
  }
}

function getClickedTile(mX){
  for (var i = 0; i < 4; i++) {
		var lowerBound = i * WIDTH;
		var upperBound = (i + 1) * WIDTH;
    if (mX >= lowerBound && mX <= upperBound) {
      return i + 12; 
    }
  }
  return -1;
}

function newRow(){
  var column = Math.floor(random(4));
  for (var i = 0; i < 4; i++) {
		tiles.unshift((column === i) ? 0 : 1);
	}
}

function getTime(){
	return Math.floor(time / 60) + "." + Math.floor(map(time % 60, 0, 59, 0, 999)) + "\"";
}