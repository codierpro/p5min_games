function Sprinter(skill, color) {
  this.distance = 0; 
  this.speed = 0; 
  this.velocity = 0; 
  this.skill = skill;
  this.previousKey = null;
  this.color = color;
  this.finished = false; 
  this.time = 0; 
}

Sprinter.prototype.draw = function(lane, laneWidth) {
	var y = (lane * laneWidth) + (laneWidth / 2); 
	fill(this.color);
	stroke(255);
	strokeWeight(2);
	ellipse(this.distance, y, laneWidth / 2);
	if(this.finished){
		textSize(laneWidth / 2);
	    noStroke();
	    fill(255);
	    textAlign(RIGHT);
	    text((this.time / 1000).toFixed(2), width - laneWidth, y);
	}
};

Sprinter.prototype.update = function() {
	if(this.finished){
		return;
	} else{
	  if (this.finished = (this.distance > width)) 
        this.time = new Date().getTime() - startTime
	}
  this.velocity = (this.velocity > 3) ? 3 : this.velocity; 
  this.distance += this.velocity; 
  this.velocity += this.speed; 
  this.velocity *= 0.99; 
  this.speed = 0; 
};

Sprinter.prototype.run = function(key) {
	if(this.previousKey != null){
		if(this.previousKey != key && (this.previousKey + key === 76)){
			this.speed += (this.velocity / 75 + 0.06);
		} else{
			this.speed = 0;
			this.velocity = 0;
		}
	} else{
		this.speed += (this.velocity / 75 + 0.06);
	}
	this.previousKey = key;
};