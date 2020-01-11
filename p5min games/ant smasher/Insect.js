function Insect(x, type) {
  this.origin = x;  
  this.position = createVector(0, 0);
  this.serpentine = random(3) + 3; 
  this.type = type; 
  this.squashed = false; 
  this.radius = 50;
}

Insect.prototype.draw = function() {
  stroke(255);
  strokeWeight(3);
  fill(this.type ? "#00FFFF" : "#FF4444");
  ellipse(this.position.x, this.position.y, this.radius);
};

Insect.prototype.update = function() {
  this.position.y += speed;
  this.position.x = cos(this.position.y * (0.005 * this.serpentine) 
  	+ this.serpentine * 10) * (width / this.serpentine) + this.origin;
};

Insect.prototype.squashedBy = function(x, y) {
	var d = dist(x, y, this.position.x, this.position.y);
    return (d < this.radius);
};