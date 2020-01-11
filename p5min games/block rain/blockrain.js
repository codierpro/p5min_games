var blocks = []; 
var totalClicks; 
var score;

function setup() {
  createCanvas(300, 500);
  textAlign(CENTER);
  score = 0;
  totalClicks = 0;
}

function draw(){
  background(51);
  rain();
  handleBlocks();
  drawHUD();
}
function mousePressed(){
	for(var i = blocks.length - 1; i >= 0; i--){
		if(blocks[i].isClicked(mouseX, mouseY)){
			blocks.splice(i, 1);
			score++;
		}
	}
	totalClicks++;
}

function handleBlocks(){
	for(var i = blocks.length - 1; i >= 0; i--){
		if(blocks[i].onScreen()){
			blocks[i].update();
			blocks[i].draw();
		} else{
			endGame();
		}
	}
}

function rain(){
	if(frameCount % 10 === 0){
		if(random() < map(score, 0, 250, 0.25, 0.99)){
			var x = random(width / 2) + width / 4;
			var velocity = random(3) + 3;
			var size = random(40) + 30;
			blocks.push(new Block(x, velocity, size, randomColor()));
		}
	}
}

function drawHUD(){
	textSize(50);
	noStroke();
	text(score, width / 2, 50);
	textSize(25);
	var accuracy = (score / +((totalClicks === 0) ? 1 : totalClicks));
	text(Math.round(accuracy * 100) + "%", width / 2, 100);
}

function endGame(){
  noLoop();
  fill(255);
  noStroke();
  textSize(50);
  text("Game Over!", width / 2, height / 2);
}

function randomColor() {
  return color(random(255), random(255), random(255));
}