function InGamePosition(settings,level){

	this.settings = settings;
	this.level = level;
	this.upSec = this.settings.updateSeconds;
	this.spaceshipSpeed = this.settings.spaceshipSpeed;
	this.object = null;
	this.spaceship = null;

}

InGamePosition.prototype.update = function(play){
	
}

InGamePosition.prototype.entry = function(play){

	this.spaceship_image = new Image();
	this.object = new Objects();
	this.spaceship = this.object.spaceship((play.width/2),play.playBoundaries.bottom,this.spaceship_image);
	
}

InGamePosition.prototype.keyDown = function(play,keyboardCode){
	//integer of left is 37 ,right is 39

	if(keyboardCode == 37){
		this.spaceship.x -= this.spaceshipSpeed * this.upSec;
		console.log(this.spaceship.x);


	}
	if(keyboardCode == 39){
		this.spaceship.x += this.spaceshipSpeed * this.upSec;
		console.log(this.spaceship.x);
	}


}


InGamePosition.prototype.draw = function(play){

	ctx.clearRect(0,0,play.width,play.height);
	ctx.drawImage(this.spaceship_image,this.spaceship.x - (this.spaceship.width/2),this.spaceship.y- (this.spaceship.height/2));
	
}