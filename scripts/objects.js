
class Objects {
	constructor() {
	}
	spaceship(x, y, spaceship_image) {
		this.x = x;
		this.y = y;
		this.width = 94;
		this.height = 91;
		this.spaceship_image = spaceship_image;
		this.spaceship_image.src = "images/ship.png";
		return this;
	}
	bullet(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
	ufo(x, y, line, column, ufo_image) {
		this.x = x;
		this.y = y;
		this.line = line;
		this.column = column;
		this.width = 76;
		this.height = 64;
		this.ufo_image = ufo_image;
		this.ufo_image.src = "images/ufo.png";
		return this;
	}
	bomb(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
}
;




