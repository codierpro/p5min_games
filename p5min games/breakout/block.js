function Block(x, y, width, heigth, color){
	this.position = createVector(x, y);
	this.xVelocity = 0;
	this.width = width;
	this.height = height;
	this.color = color;
	this.intact = true;
}

Block.prototype.draw = function(){
	fill(this.color);
	rect(this.position.x, this.position.y, this.width, this.height);
};

Block.prototype.update = function(){
	this.position.x += this.xVelocity;
	this.xVelocity *= 0.7;
	this.position.x = constrain(this.position.x, 0, width - this.width);
};

Block.prototype.move = function(x) {
	this.velocity += x;
};