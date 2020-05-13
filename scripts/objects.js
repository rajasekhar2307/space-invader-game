
function Objects(){

};
Objects.prototype.spaceship = function (x,y,spaceship_image){

	this.x=x;
	this.y=y;
	this.width = 94;
	this.height= 91;
	this.spaceship_image=spaceship_image;
	this.spaceship_image.src = "images/ship.png";
	return this;
};

Objects.prototype.bullet = function(x,y){ 
	
	this.x=x;
	this.y=y;
	return this;

};

Objects.prototype.ufo = function(x,y,line,column,ufo_image){

	this.x = x;
	this.y = y;
	this.line = line;
	this.column = column;
	this.width = 76;
	this.height = 64;
	this.ufo_image = ufo_image;
	this.ufo_image.src = "images/ufo.png";
	return this;
};