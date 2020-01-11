function Basket(x, y) {
	this.position = createVector(x, y);
	this.fluidColor = color("#FFFFFF");
}

Basket.prototype.update = function(x) {
	this.position.x = constrain(x, 0, width);
};

Basket.prototype.draw = function() {
	var leftX = this.position.x - HALF_B_SIZE; 
	var rightX = this.position.x + HALF_B_SIZE; 
	var bottomY = this.position.y - HALF_B_SIZE; 
	var topY = this.position.y + HALF_B_SIZE;
	fill(this.fluidColor);
	noStroke();
	rect(leftX, this.position.y, B_SIZE, HALF_B_SIZE);
	stroke(255);
	strokeWeight(3);
	noFill();
	beginShape();
	vertex(leftX, bottomY);
	vertex(leftX, topY);
	vertex(rightX, topY);
	vertex(rightX, bottomY);
	endShape();
};

Basket.prototype.catch = function(ball) {
	var amount = ball.size * 0.01;
	this.fluidColor = lerpColor(this.fluidColor, ball.color, amount);
};
