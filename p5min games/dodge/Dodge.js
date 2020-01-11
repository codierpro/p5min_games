var player;
var projectiles = []; 
var difficulty;

function setup() {
	createCanvas(600, 400);
	difficulty = 2;
    player = new Square(width / 2, height / 2,
		30, color("#FFFFFF"), null, difficulty * 0.8);
	textAlign(CENTER);
    textSize(40);
}

function draw(){
	background(51);
    handleProjectiles();
	handlePlayer();
	handleKeys();
	attemptNewProjectile(frameCount);
    drawScore();
}

function attemptNewProjectile(frame){
	if(frame % 30 === 0){
		if (random(difficulty) > 1.25) {
			projectiles.push(generateSquare());
		}
    difficulty += 0.05;
	}
}

function handleKeys(){
	var speed = difficulty * 0.8;
  if (keyIsDown(UP_ARROW))
    player.move(0, -speed);
  if (keyIsDown(DOWN_ARROW))
    player.move(0, speed);
  if (keyIsDown(LEFT_ARROW))
    player.move(-speed, 0);
  if (keyIsDown(RIGHT_ARROW))
    player.move(speed, 0);
}

function drawScore(){
	noStroke();
    text(frameCount, width / 2, 60);
}

function handleProjectiles(){
	for(var i = projectiles.length - 1; i >= 0; i--){
		projectiles[i].update(false); 
    projectiles[i].draw();
    if (projectiles[i].collidesWith(player))
      endGame();
    if (projectiles[i].isOffscreen())
      projectiles.splice(i, 1);
	}
}

function handlePlayer(){
  player.update(true);
  player.draw();
  if (player.isOffscreen()) {
    endGame();
  }
}

function endGame(){
  noLoop();
  textSize(70);
  fill(255);
  noStroke();
  text("Game Over!", width / 2, height / 2);
  textSize(40);
}

function generateSquare(){
	var plane = (random() > 0.5);
  var x = (plane) ? random(width) : ((random() > 0.5) ? 0 : width);
  var y = (plane) ? ((random() > 0.5) ? 0 : height) : random(height);

  return new Square(x, y, random(35), randomColor(), player.position, difficulty);
}

function randomColor() {
  return color(random(255), random(255), random(255));
}
