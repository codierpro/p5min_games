function Row(y, cellCount) {
	this.velocity = 1; 
	this.y = y;
	this.cellCount = cellCount; 
	this.cells = [];
	this.dynamic = true; 
	this.initializeRow(cellCount);
}

Row.prototype.update = function() {
	if (this.velocity > 0){
		for(var x = WIDTH - 1; x >= 0; x--){
			if(!this.cells[x])
				continue;
				if(x < WIDTH - 1){
					this.cells[x] = false;
			     	this.cells[x + 1] = true;
				} else{
					this.reverse();
					break;
				}
		}
	} else{
		for(var x = 0; x < WIDTH; x++){
			if(!this.cells[x])
				continue;
				if(x > 0){
					this.cells[x] = false;
					this.cells[x - 1] = true;
				} else{
					this.reverse();
					break;
				}
		}
	}
};

Row.prototype.stop = function(previousRow) {
	if(previousRow){
		var cellCount = 0;
		for(var x = 0; x < WIDTH; x++){
			if(this.cells[x] && previousRow.cells[x]){
				this.cells[x] = true;
				cellCount++;
			} else{
				this.cells[x] = false;
			}
		} 
		this.dynamic = false;
		return cellCount;
	} else{
		this.dynamic = false;
		return this.cellCount;
	}
};

Row.prototype.reverse = function() {
	this.velocity *= -1;
	this.update();
};

Row.prototype.initializeRow = function(c) {
	for(var x = 0; x < WIDTH; x++){
		this.cells.push((x < c));
	}
};