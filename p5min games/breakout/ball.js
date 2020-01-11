function Ball(x, y, xVelocity, yVelocity, radius){
	this.position = createVector(x, y);
	this.velocity= createVector(xVelocity, yVelocity);
	this.radius = radius;
}

Ball.prototype.draw = function(){
	fill("#999");
	ellipse(this.position.x, this.position.y, this.radius * 2);
};

Ball.prototype.update = function(blocks, staticBlocks, paddle){
	this.position.add(this.velocity);
	for(var i = 0; i < blocks.length; i++){
		if (blocks[i].intact){
			rebound = this.collidesWith(blocks[i]);
		if (rebound.collision){
			blocks[i].intact = false;
			score++;
			break;
		}
		}
	}
	if(rebound == null || !rebound.collision)
		rebound = ball.collidesWith(paddle);
	if (rebound == null || rebound.collision)
		for(var j = 0; j < staticBlocks.length; j++){
			rebound = this.collidesWith(staticBlocks[j]);
		}
	if (rebound != null && rebound.collision){
		this.velocity.x *= rebound.velocityChange.x;
		this.velocity.y *= rebound.velocityChange.y;
	} else{
		if (this.position.x < 0 || this.position.x > width)
			this.velocity.x *= -1;
		if(this.position.y < 0)
			this.velocity.y *= -1;
		else if (this.position.y > width)
			endGame(false);
	}
};

Ball.prototype.collidesWith = function(block){
	var nextPosition = createVector(this.position.x + this.velocity.x,
		this.position.y + this.velocity.y);
	var upperYBlock = block.position.y; 
	var upperYBound = block.position.y - this.radius; 
	var lowerYBlock = block.position.y + block.height; 
	var lowerYBound = block.position.y + block.height + this.radius; 
	var withinTopBound = (nextPosition.y >= upperYBound) && (nextPosition.y <= upperYBlock);
	var withinBottomBound = (nextPosition.y <= lowerYBound) && (nextPosition.y >= lowerYBlock);
	var yBound = (nextPosition.y >= upperYBound) && (nextPosition.y <= lowerYBound);
	var leftXBlock = block.position.x; 
	var leftXBound = block.position.x - this.radius; 
	var rightXBlock = block.position.x + block.width; 
	var rightXBound = block.position.x + block.width + this.radius; 
	var withinLeftBound = (nextPosition.x >= leftXBound) && (nextPosition.x <= leftXBlock);
	var withinRightBound = (nextPosition.x <= rightXBound) && (nextPosition.x >= rightXBlock);
	var xBound = (nextPosition.x >= leftXBound) && (nextPosition.x <= rightXBound);
	var xChange = 1; 
	var yChange = 1;
	var collided = (xBound && yBound);
	if(collided){
		xChange = (withinLeftBound || withinRightBound) ? -1 : 1;
		yChange = (withinTopBound || withinBottomBound) ? -1 : 1;
		this.velocity.mult(1.0175);
	}
	return{
		collision: collided,
		velocityChange: createVector(xChange, yChange)
	};
};