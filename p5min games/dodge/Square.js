function Square(x, y, size, color, player, speed) {
  this.position = createVector(x, y);
  this.speed = speed;
  this.velocity = this.setVelocity(this.position, player);
  this.size = size; 
  this.color = color;
}

Square.prototype.update = function(specific) {
	this.position.add(this.velocity);
	if (specific) {
	    this.velocity.x *= 0.5;
	    this.velocity.y *= 0.5;
	}
};

Square.prototype.draw = function() {
  fill(this.color);
  stroke(255);
  strokeWeight(3);

  rect(this.position.x, this.position.y, this.size, this.size);
};

Square.prototype.isOffScreen = function() {
	return (this.position.x < 0 || this.position.x + this.size > width ||
      this.position.y < 0 || this.position.y + this.size > height);
};

Square.prototype.collidesWith = function(square) {
	var cX = this.position.x + this.size / 2;
    var cY = this.position.y + this.size / 2;
	var center = createVector(cX, cY); 
	var rX = square.position.x + square.size;
	var rY = square.position.y + square.size;
	var rightBound = createVector(rX, rY); 
  return !(center.x < square.position.x || center.x > rightBound.x ||
      center.y < square.position.y || center.y > rightBound.y);
};

Square.prototype.move = function(xAcceleration, yAcceleration) {
  this.velocity.add(createVector(xAcceleration, yAcceleration));
};

Square.prototype.setVelocity = function(vel1, vel2) {
	if (vel1 != null && vel2 != null) {
		var velocity = createVector(vel2.x - vel1.x, vel2.y - vel1.y);
		velocity.setMag(this.speed); 
		return velocity;
	}
	return createVector(1, 0);
};