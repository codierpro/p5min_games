const B_SIZE = 50;
const HALF_B_SIZE = B_SIZE / 2;
var basket; 
var orbs = []; 
var score;

function setup() {
  createCanvas(400, 600);
  basket = new Basket(width / 2, height - B_SIZE);
  score = 0;
  textAlign(CENTER);
}

function draw(){
	background(51);
	handleOrbs();
    attemptNewOrb(frameCount);
	basket.update(mouseX);
	basket.draw();
	drawScore();
}

function handleOrbs(){
	for(var i = orbs.length - 1; i >= 0; i--){
		if(orbs[i].onScreen){
			orbs[i].update();
            orbs[i].draw();
            if (orbs[i].caughtBy(basket)) {
		        score += 1;
				basket.catch(orbs[i]);
		        orbs.splice(i, 1);
      		}
		} else{
			endGame();
		}
	}
}

function attemptNewOrb(frame){
	if(frame % 20 === 0){
		var chance = map(score, 0, 100, 0.25, 0.99);
		if (random() < chance) {
			var color = randomColor();
			var size = random(20) + 10;
			var velocity = random(3) + 3;
			var orb = new Ball(random(width), 0, size, color, velocity);
			orbs.push(orb);
		}
	}
}

function drawScore() {
	textSize(40);
  noStroke();
  fill(255);
  text(score, width / 2, 50);
}

function endGame() {
  noLoop();
  textSize(60);
  noStroke();
  fill(255);
  text("Game Over!", width / 2, height / 2);
}

function randomColor() {
  return color(random(255), random(255), random(255));
}