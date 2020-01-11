function Doodler(x, altitude, enemy, size, color){
  this.location = createVector(x, altitude);
  this.velocity = createVector(0, 0);
  this.maxAltitude = altitude;  
  this.premaxAltitude = altitude; 
  this.force = 12;
  this.color = color;
  this.size = size;
  this.enemy = enemy; 
  this.drone = 0; 
  this.onScreen = true;
}

Doodler.prototype.update = function() {
	  if (this.enemy) {
		// drone across the screen

	this.drone += map(this.maxAltitude, 0, 15000, 0.0001, 0.1);
    this.location.x = (Math.sin(this.drone) * (width / 2)) + width / 2;
  } else {
    this.location.add(this.velocity);
    this.velocity.x *= 0.8;
	  player.applyForce(createVector(0, GRAVITY));
    this.maxAltitude = (this.location.y > this.maxAltitude) ? this.location.y : this.maxAltitude;
  }

};

Doodler.prototype.jump = function() {
  this.velocity.y *= 0;
  if (this.premaxAltitude == this.maxAltitude) {
    this.force = constrain(this.force + 1, 12, 16);
  } else {
    this.force = 12;
  }
  this.applyForce(createVector(0, this.force));
  this.premaxAltitude = this.maxAltitude;
};

Doodler.prototype.applyForce = function(force) {
	this.velocity.add(force);
};

Doodler.prototype.collidesWith = function(doodler) {
  var distance = dist(doodler.location.x, doodler.location.y, this.location.x, this.location.y);
  if (distance < (this.size / 2 + doodler.size / 2)) {
    if (doodler.location.y < this.location.y) {
      endGame();
      return false;
    } else {
      return true;
    }
  }
};

Doodler.prototype.draw = function(altitude) {
  stroke(255);
  strokeWeight(3);
  fill(this.color);

  if(this.enemy){
  	if(altitude - this.location.y < height){
  		ellipse(this.location.x, altitude - this.location.y + height / 2, this.size);
  	} else{
  		this.onScreen = false;
  	}
  } else{
  	ellipse(this.location. x, height / 2, this.size);
  }
};