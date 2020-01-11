function Rocket(x, y, s, color){
  this.x = x;
  this.y = y;
  this.xVelocity = null;
  this.speed = 5;
  this.size = s;
  this.color = color;
}

Rocket.prototype.update = function() {
  this.xVelocity *= 0.7;
  this.x += this.xVelocity;
};

Rocket.prototype.collidesWith = function(wall) {
  var left = this.x - this.size / 2; // rocket's left bound
  var right = this.x + this.size / 2; // rocket's right bound

  return (left < wall.leftBound || right > wall.rightBound);
};

Rocket.prototype.draw = function() {
	fill(255);
	stroke(this.color);
	strokeWeight(3);
	var halfSize = this.size / 2;
    var height = Math.sqrt(Math.pow(this.size, 2) - Math.pow(halfSize, 2));
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x - halfSize, this.y + height);
    vertex(this.x + halfSize, this.y + height);
    endShape(CLOSE);
};

Rocket.prototype.move = function(m) {
	this.xVelocity += (m * this.speed);
};