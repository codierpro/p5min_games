function Block(x, velocity, size, color) {
  this.position = createVector(x, -50);
  this.velocity = velocity;
  this.size = size;
  this.color = color;
}

Block.prototype.update = function() {
	this.position.y += this.velocity;
};

Block.prototype.isClicked = function(x, y) {
  var xMaximum = this.position.x + this.size; 
  var yMaximum = this.position.y + this.size; 
  return !(x < this.position.x || x > xMaximum || y < this.position.y || y > yMaximum);
};

Block.prototype.onScreen = function() {
	return this.position.y < height;
};

Block.prototype.draw = function() {
  stroke(255);
  strokeWeight(3);
  fill(this.color);
  rect(this.position.x, this.position.y, this.size, this.size);
};
