function Lazer(angle, radius, speed) {
  this.x = null;
  this.y = null;
  this.angle = angle; 
  this.radius = radius; 
  this.speed = speed; 
  this.onScreen = true;
}

Lazer.prototype.update = function() {
  this.radius += this.speed;
  this.x = this.radius * sin(this.angle);
  this.y = this.radius * cos(this.angle);
  this.onScreen = (this.radius < width);
};

Lazer.prototype.penetrates = function(asteroid) {
	var d = dist(this.x + width / 2, this.y + height / 2, asteroid.position.x, asteroid.position.y);
    return (d < asteroid.size / 2);
};

Lazer.prototype.draw = function() {
  stroke("#009900");
  strokeWeight(3);
  push(); 
  translate(width / 2, height / 2);
  point(this.x, this.y);
  pop(); 
};