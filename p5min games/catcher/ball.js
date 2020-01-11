function Ball(x, y, size, color, velocity) {
  this.position = createVector(x, y);
  this.velocity = velocity;
  this.size = size;
  this.color = color;
  this.onScreen = true;
}

Ball.prototype.draw = function() {
  stroke(255);
  strokeWeight(3);
  fill(this.color);
  ellipse(this.position.x, this.position.y, this.size);
};

Ball.prototype.update = function() {
  this.position.y += this.velocity;
  this.onScreen = (this.position.y < height);
};

Ball.prototype.caughtBy = function(basket) {
  var leftX = basket.position.x - HALF_B_SIZE; 
  var rightX = basket.position.x + HALF_B_SIZE; 
  var topY = basket.position.y + HALF_B_SIZE; 
  return !(this.position.x < leftX || this.position.x > rightX ||
    this.position.y < basket.position.y || this.position.y > topY);
};