const GRAVITY = -0.6;
var player;
var points;
var platforms = [];

function setup(){
  createCanvas(400, 600);
  player = new Doodler(width / 2, height / 2, false, 30, color("#FFF070"));
  platforms = generatePlatforms();
  points = 0;
  frameRate(60);
}

function draw(){
  background(51);
  handlePlayer();
  handlePlatforms();
  drawScore();
  handleKeys();
}

function handlePlayer(){
	player.update();
    player.draw();
  if (player.maxAltitude + player.location.y < -height / 2) {
    endGame();
  }
}

function handlePlatforms(){
	for(var i = platforms.length - 1; i >= 0; i--){
		if(platforms[i].onScreen){
			platforms[i].draw(player.location.y);
				if (platforms[i] instanceof Doodler)
				platforms[i].update(); 
      if (platforms[i].collidesWith(player)) {
        player.jump();
        if (platforms[i] instanceof Doodler) {
          points += 100;
          platforms.splice(i, 1); 
        }
      }
		} else{
      platforms.splice(i, 1);
      var x = noise(player.maxAltitude, frameCount) * width;
      var y = player.maxAltitude + height;
      if (random() < 0.9) {
        platforms.push(new Platform(x, y, 55, color("#FF80F0")));
      } else {
        if (random() > 0.5) {
					platforms.push(new Doodler(x, y, true, 50, color("#00FFFF")));
				}

       		}
		}
	}
}

function generatePlatforms(){
	var field = []; 
	for (var y = 0; y < height * 2; y += 40) {
    for (var i = 0; i < 3; i++) { 
      var x = noise(i, y) * width;
      if (noise(y, i) > 0.5) 
        field.push(new Platform(x, y, 55, color("#FF80F0")));
    }
  }
	return field;
}

function handleKeys(){
  if (keyIsDown(LEFT_ARROW)) {
    player.applyForce(-1, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.applyForce(1, 0);
  }	
}

function drawScore(){
  textSize(30);
  textAlign(LEFT);
  fill(255);
  noStroke();
  text((player.maxAltitude + points).toFixed(0), 50, 50);
}

function endGame(){
  textAlign(CENTER);
  textSize(60);
  noStroke();
  fill("#90FF90");
  text("Game Over!", width / 2, height / 2);
  noLoop();
}