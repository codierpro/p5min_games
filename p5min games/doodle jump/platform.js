function Platform(x, altitude, size, color){
  this.x = x;
  this.altitude = altitude;
  this.size = size;
  this.color = color;
  this.onScreen = true;
}

Platform.prototype.draw = function(altitude) {
  stroke(255);
  strokeWeight(3);
  fill(this.color);

  if(altitude - this.altitude < height / 2){
  	rect(this.x, (altitude - this.altitude + height / 2), this.size, 15);
  } else{
  	this.onScreen = false;
  }
};

Platform.prototype.collidesWith = function(doodler) {
  var platformTop = this.altitude;
  var doodlerBottom = doodler.location.y - doodler.size / 2 ;
  stroke("#FF0000");
  strokeWeight(10);
  if (Math.abs(platformTop - doodlerBottom) < -doodler.velocity.y && platformTop < doodlerBottom) {
    var platformLeftX = this.x; 
    var platformRightX = this.x + this.size; 
    var doodlerLeftX = doodler.location.x - doodler.size / 2; 
    var doodlerRightX = doodler.location.x + doodler.size / 2; 
    return ((doodlerLeftX >= platformLeftX && 
			doodlerLeftX <= platformRightX) ||
			(doodlerRightX >= platformLeftX && 
			doodlerRightX <= platformRightX));
  }
  return false;
};