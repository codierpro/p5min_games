const SPRINTER_COUNT = 7; 
var runners = []; 
var runner; 
var laneWidth; 
var startTime; 

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	var opponentColor = randomColor();
	for(var i = 1; i < SPRINTER_COUNT; i++){
		runners.push(new Sprinter(random(0.075) + 0.1, opponentColor));
	}
    runner = new Sprinter(0, invertColor(opponentColor));
	runners.splice(Math.floor(runners.length / 2), 0, runner);
	startTime = new Date().getTime();
	laneWidth = height / runners.length;
}

function draw(){
  background(51);
  handleTrack();
  stride();
}

function keyPressed(){
	runner.run(keyCode);
}

function stride(){
	for (var r = 0; r < runners.length; r++) {
    	if (random() < runners[r].skill) { 
			runners[r].run(76 - runners[r].previousKey);
		}
    }
}

function handleTrack(){
	for (var r = 0; r < runners.length; r++) {
		runners[r].draw(r, laneWidth);
		runners[r].update();
		var y1 = (r / runners.length) * height; 
        var y2 = (r / runners.length) * height + laneWidth;
        stroke("#A14948");
		strokeWeight(3);
	    line(0, y1, width, y1);
	    line(0, y2, width, y2);
	}
}

function randomColor() {
    return color(random(255), random(255), random(255));
}

function invertColor(col){
	var r = 255 - red(col);
	var g = 255 - green(col);
	var b = 255 - blue(col);

	return color(r, g, b);
}