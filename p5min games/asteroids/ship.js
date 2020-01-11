function Ship(fillColor, strokeColor) {
  this.angle = 0; 
  this.angleVelocity = 0; 
  this.fillColor = fillColor; 
  this.strokeColor = strokeColor;
}

Ship.prototype.update = function() {
	this.angle += this.angleVelocity;
	this.angleVelocity *= 0.7;
};

Ship.prototype.shoot = function(bullets) {
	bullets.push(new Lazer(-this.angle + PI, 0, 5));
};

Ship.prototype.rotate = function(acceleration) {
	this.angleVelocity += acceleration;
};

Ship.prototype.draw = function() {
  fill(this.fillColor);
  strokeWeight(2);
  stroke(this.strokeColor);
  push(); 
  translate(width / 2, height / 2); 
  rotate(this.angle); 
  beginShape();
  vertex(0, -30);
  vertex(15, 15);
  vertex(-15, 15);
  endShape(CLOSE);
  pop();
};