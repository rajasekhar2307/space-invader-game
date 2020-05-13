function InGamePosition(settings,level){

	this.settings = settings;
	this.level = level;
	this.spaceshipSpeed = this.settings.spaceshipSpeed;
	this.object = null;
	this.spaceship = null;
	this.bullets = [];
	this.lastBulletTime = null;
	this.ufos = [];

};

InGamePosition.prototype.update = function(play){

	const spaceship= this.spaceship;
	const spaceshipSpeed = this.spaceshipSpeed;
	const upSec = this.settings.updateSeconds;
	const bullets = this.bullets;


	//integer of left is 37 ,right is 39

	if(play.pressedKeys[37]){
		spaceship.x -= spaceshipSpeed * upSec;

	}
	if(play.pressedKeys[39]){
		spaceship.x += spaceshipSpeed * upSec;

	}
	if(play.pressedKeys[32]){
		this.shoot();
	}

	if(this.spaceship.x < play.playBoundaries.left){
		spaceship.x = play.playBoundaries.left;
	}
	
	if(this.spaceship.x > play.playBoundaries.right){
		spaceship.x = play.playBoundaries.right;
	}

	//moving the bullets
	for(let i=0;i<bullets.length;i++){

		let bullet = bullets[i];
		bullet.y -= upSec * this.settings.bulletSpeed;

		//if bullet is out of canvas it is cleared
		if(bullet.y <0){
			bullets.splice(i--,1);
		}
	}

	let reachedRight = false;
	let reachedLeft = false;


	for(let i=0;i<this.ufos.length ;i++){

		let ufo = this.ufos[i];
		let fresh_x = ufo.x + this.ufoSpeed * upSec * this.turnAround;

		if(fresh_x >play.playBoundaries.right ){

			this.turnAround *= -1;
			reachedRight = true;
		}
		if(fresh_x <play.playBoundaries.left ){

			this.turnAround *= -1;
			reachedLeft = true;
		}

		if(!reachedLeft == true && !reachedRight == true){

		ufo.x= fresh_x;
		}
	}
};

InGamePosition.prototype.shoot = function(){

	if(this.lastBulletTime == null || (new Date().getTime() - this.lastBulletTime)>(this.settings.bulletMaxFrequency)){

		
		this.object = new Objects();
		this.bullets.push(this.object.bullet(this.spaceship.x,this.spaceship.y- this.spaceship.height/2,this.settings.bulletSpeed));
		this.lastBulletTime = (new Date()).getTime();


	}



	
};

InGamePosition.prototype.entry = function(play){

	this.turnAround = 1;
	this.upSec = this.settings.updateSeconds;
	this.spaceshipSpeed = this.settings.spaceshipSpeed;
	this.ufo_image = new Image();
	this.spaceship_image = new Image();
	this.object = new Objects();
	this.spaceship = this.object.spaceship((play.width/2),play.playBoundaries.bottom,this.spaceship_image);



	let presentLevel = this.level;
	this.ufoSpeed = this.settings.ufoSpeed + (presentLevel *7);
	

	//Creating UFOS
	const lines = this.settings.ufoLines;
	const columns = this.settings.ufoColumns;
	const ufoInitial = [];

	let line ,column;

	for(line =0 ;line<lines;line++){

		for(column =0; column <columns;column++){

			this.object = new Objects();
			let x,y;
			x = (play.width/2)+(column*70) - ((columns-1)*45);
			y = (play.playBoundaries.top +30)+(line*50);
			ufoInitial.push(this.object.ufo(x,y,line,column,this.ufo_image));

		} 
	}
	this.ufos= ufoInitial;


};

InGamePosition.prototype.keyDown = function(play,keyboardCode){
	


};


InGamePosition.prototype.draw = function(play){

	ctx.clearRect(0,0,play.width,play.height);
	ctx.drawImage(this.spaceship_image,this.spaceship.x - (this.spaceship.width/2),this.spaceship.y- (this.spaceship.height/2));

	//draw bullets
	ctx.fillStyle = 'ff0000';
	for (let i=0;i< this.bullets.length;i++){
		let bullet = this.bullets[i];

		ctx.fillRect(bullet.x-1,bullet.y-6,2,6);
	}

	//draw UFOS

	for (let i=0;i<this.ufos.length;i++){
		let ufo = this.ufos[i];
		ctx.drawImage(this.ufo_image,ufo.x-(ufo.width/2),ufo.y -(ufo.height/2));
	}
	
};