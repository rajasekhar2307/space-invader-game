
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