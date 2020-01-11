var paddle;
var ball;
var blocks = [];
var staticBlocks = [];
var score;


function setup(){
	createCanvas(600, 400);
	ball = new Ball(width / 2, height / 2, random(-3, 3), random(2, 4), 10);
	paddle = new Block(width / 2 - 50, height - 40, 100, 10, "#FFFFF");
	populateBlocks(5, 5);
	score = 0;
	textSize(20);
	textAlign(CENTER);
	noStroke();
}

function draw(){
	background(51);
    if (score === blocks.length)
	    endGame(true);
		drawGame();
		handleKeys();
		paddle.update();
		ball.update(blocks, staticBlocks, paddle);
		handleKeys();
}

function handleKeys() {
  if (keyIsDown(LEFT_ARROW)) {
    paddle.move(-2);
  }
   else if (keyIsDown(RIGHT_ARROW)) {
    paddle.move(2);
  }
}

function drawGame(){
	fill(255);
	text(score, 50, height - 50);
	paddle.draw();
	ball.draw();
	for(var i = 0; i < blocks.length; i++){
		if (blocks[i].intack)
			blocks[i].draw();
	}
}

function endGame(won){
	fill(255);
	textSize(50);

	if(won) {
		text("You win!", width / 2, heigth / 2);
	}
	else{
		text("You lose!", width / 2, heigth / 2);
	}
	textSize(30);
	text("Press f5 to restart!", width / 2, heigth / 2 - 40);

	noLoop();
}

function populateBlocks(rows, cols){
	blocks = [];
	var padding = 5;
	var w = (width / cols) - (padding * 2);
	var h = 10;
	var offset =(width - (w + padding) * cols) / 2;
	for(var row = 0; row < rows; row++){
		for(var col = 0; col < cols; col++){
			var x  = (col * w) + (col * padding) + offset;
			var y = (row * h) + (row * padding);
			blocks.push(new Block(x, y, w, h, color(random(255, 0, random(255)))));
		}
	}
}