function Asteroid(x, y, size, color){
  this.position = createVector(x, y);
  this.size = size; 
  this.color = color;
}

Asteroid.prototype.update = function() {
  var path = createVector(width / 2, height / 2).sub(this.position); 
  path.setMag(5 - log(this.size)); 
  this.position.add(path); 
  var d = dist(this.position.x, this.position.y, width / 2, height / 2);
  if (d < this.size / 2) {
    endGame();
  }
};

Asteroid.prototype.draw = function() {
	fill(51);
  stroke(this.color);
  strokeWeight(5);

  ellipse(this.position.x, this.position.y, this.size);
};