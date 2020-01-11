function Tile(x, y, size, col, brightCol) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.col = col; 
  this.brightCol = brightCol;
}

Tile.prototype.draw = function(lit) {
  noStroke();
  fill((lit) ? this.brightCol : this.col);
  ellipse(this.x, this.y, (lit) ? this.size * 1.2 : this.size);
};

Tile.prototype.inBounds = function(x, y) {
	var d = dist(x, y, this.x, this.y);
	return(d < this.size / 2);
};

function getTile(tiles, x, y){
	for(var i = 0; i < tiles.length; i++){
		if(tiles[i].inBounds(x, y)){
			return i;
		}
	}
	return -1;
}