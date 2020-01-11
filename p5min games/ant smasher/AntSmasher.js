var bugs = [];
var score;
var totalClicks; 
var playing; 
var speed; 
var bugChance; 

 function setup() {
 	createCanvas(400, 600);
    score = 0;
	totalClicks = 0;
    playing = true;
	speed = 3;
	bugChance = 0.4;
    textSize(30);
 }

 function draw(){
 	background(51);
 	handleBugs();
	attemptNewBug(frameCount);
	handleDifficulty(frameCount, score);
	drawScore();
	gameOver(playing);
 }

 function mousePressed(){
 	for(var i = 0; i < bugs.length; i++){
 		bugs[i].squashed = bugs[i].squashedBy(mouseX, mouseY);
 		if(bugs[i].squashed && bugs[i].type)
 			endGame();
 	}
 	totalClicks++;
 }

 function handleBugs(){
 	for (var i = bugs.length - 1; i >= 0; i--) {
 		bugs[i].update();
 		bugs[i].draw();
 		if(bugs[i].position.y > height && !bugs[i].type){
 			endGame();
 		}
 		if (bugs[i].squashed){
 			bugs.splice(i, 1);
 			score++;
 		}
 	}
 }

 function attemptNewBug(frame){
 	if(random() < bugChance){
 		var x = random(width / 2) + width / 4;
 		var type = (random() > 0.8);
 		bugs.push(new Insect(x, type));
 	}
 }

 function handleDifficulty(frame, score){
 	if(frame % 60 === 0){
 		bugChance = map(score, 0, 500, 0.4, 0.999);
 		speed = map(score, 0, 500, 3, 30);
 	}
 }

 function gameOver(playing){
 	if(!playing){
 		fill(255);
		noStroke();
		textSize(60);
		textAlign(CENTER);
		text("Game Over!", width / 2, height / 2);
		totalClicks = (totalClicks === 0) ? 1 : totalClicks;
		var accuracy = Math.round(score / totalClicks * 100);
		textSize(30);
		text("Squash accuracy: " + accuracy + "%",
		width / 2, height / 2 + 70);
		textAlign(LEFT);
		textSize(30);
 	}
 }

 function drawScore(){
	  fill(255);
	  noStroke();
	  text(score, 10, 40);
 }

 function endGame(){
 	playing = false;
    noLoop();
 }