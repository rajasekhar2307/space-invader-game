function InGamePosition(settings,level){

	this.settings = settings;
	this.level = level;
	this.spaceshipSpeed = this.settings.spaceshipSpeed;
	this.object = null;
	this.spaceship = null;
	this.bullets = [];
	this.lastBulletTime = null;
	this.ufos = [];
	this.bombs= [];

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

	let reachedSide = false;


	for(let i=0;i<this.ufos.length ;i++){

		let ufo = this.ufos[i];
		let fresh_x = ufo.x + this.ufoSpeed * upSec * this.turnAround * this.horizontalMoving;
		let fresh_y = ufo.y + this.ufoSpeed * upSec * this.verticalMoving;


		if(fresh_x >play.playBoundaries.right || fresh_x <play.playBoundaries.left){

			this.turnAround *= -1;
			reachedSide = true;
			this.horizontalMoving = 0;
			this.verticalMoving = 1;
			this.ufosAreSinking = true;
		}

		if(reachedSide != true){

		ufo.x= fresh_x;
		ufo.y = fresh_y;
		}
	}

	if(this.ufosAreSinking == true ){
		this.ufoPresentSinkingValue += this.ufoSpeed * upSec;
		if(this.ufoPresentSinkingValue >= this.settings.ufoSinkingValue){

			this.ufosAreSinking = false;
			this.verticalMoving =0;
			this.horizontalMoving = 1;
			this.ufoPresentSinkingValue = 0;
		}
	}

	//ufos bombing 
	const frontLineUFOs =[];
	for(let i=0;i<this.ufos.length;i++){
		let ufo = this.ufos[i];
		if(!frontLineUFOs[ufo.column] || frontLineUFOs[ufo.column].line < ufo.line){
			frontLineUFOs[ufo.column] = ufo;
		}
	}

	//give a chance for bombing

	for(let i=0;i<this.settings.ufoColumns;i++){

		let ufo = frontLineUFOs[i];
		if(!ufo) continue ;
		let chance = this.bombFrequency *upSec;
		this.object = new Objects();
		if(chance > Math.random()){
			this.bombs.push(this.object.bomb(ufo.x,ufo.y + ufo.height/2));
		}
	}

	//moving bombs
	for(let i=0;i<this.bombs.length;i++){

		let bomb = this.bombs[i];
		bomb.y += upSec* this.bombSpeed;
		//if a bomb falls out of canvas it gets deleted

		if(bomb.y>this.height){

			this.bombs.splice(i--,1);
		}
	}

	//ufo bullet collision
	for(let i=0;i<this.ufos.length ;i++){

		let ufo = this.ufos[i];
		let collision = false;
		for(let j=0;j<bullets.length;j++){

			let bullet = bullets[j];
			//collision check 
			if(bullet.x >= (ufo.x-ufo.width/2) && bullet.x <= (ufo.x + ufo.width/2) && 
				bullet.y >= (ufo.y-ufo.height/2) && bullet.y <= (ufo.y + ufo.height/2)){

				bullets.splice(j--,1);
			collision = true;
			play.score+= this.settings.pointsPerUFO;
			}
		}

		if(collision==true){
			this.ufos.splice(i--,1);
			play.sounds.playSound('ufo');
		}
	}

	//spaceship and bomb cillisiion

	for(let i=0;i<this.bombs.length ;i++){

		let bomb = this.bombs[i];
		if(bomb.x + 2>= (spaceship.x - spaceship.width/2)&&
			bomb.x -2<= (spaceship.x + spaceship.width/2)&&
			bomb.y + 6>= (spaceship.y - spaceship.height/2)&&
			bomb.y <= (spaceship.y + spaceship.height/2)){

			//if collision del bomb
		this.bombs.splice(i--,1);

		play.sounds.playSound('explosion');
		//effect on spaceship

		//play.goToPosition(new OpeningPosition());
		play.shields --;


		}
	}

	//spaceship ufo collision
	for(let i; i<this.ufos.length;i++){

		let ufo = this.ufos[i];
		if(ufo.x +ufo.width/2 > (spaceship.x - spaceship.width/2)&&
			ufo.x - ufo.width/2 <(spaceship.x + spaceship.width/2)&&
			ufo.y + ufo.height/2 > (spaceship.y - spaceship.height/2)&&
			ufo.y - ufo.height/2 < (spaceship.y + spaceship.height/2)){
			//if there is collision spaceship explodes
			play.sounds.playSound('explosion');
			//play.goToPosition(new OpeningPosition());
			play.shields -=1;
		}
	}
	
	if (play.shields <0){
		play.goToPosition(new GameOverPosition());
	}

	//level completed
	if(this.ufos.length == 0){
		play.level +=1;
		play.goToPosition(new TransferPosition(play.level));
	}

	/*if(this.temp<1){

		this.temp++;
	}*/
};

InGamePosition.prototype.shoot = function(){

	if(this.lastBulletTime == null || (new Date().getTime() - this.lastBulletTime)>(this.settings.bulletMaxFrequency)){

		
		this.object = new Objects();
		this.bullets.push(this.object.bullet(this.spaceship.x,this.spaceship.y- this.spaceship.height/2,this.settings.bulletSpeed));
		this.lastBulletTime = (new Date()).getTime();
		play.sounds.playSound('shot');


	}



	
};

InGamePosition.prototype.entry = function(play){

	this.horizontalMoving = 1;
	this.verticalMoving =0;
	this.ufosAreSinking = false;
	this.ufoPresentSinkingValue = 0;
	this.turnAround = 1;
	this.upSec = this.settings.updateSeconds;
	this.spaceshipSpeed = this.settings.spaceshipSpeed;
	this.ufo_image = new Image();
	this.spaceship_image = new Image();
	this.object = new Objects();
	this.spaceship = this.object.spaceship((play.width/2),play.playBoundaries.bottom,this.spaceship_image);



	let presentLevel = this.level<11 ? this.level :10;
	this.ufoSpeed = this.settings.ufoSpeed + (presentLevel *7);
	this.bombSpeed = this.settings.bombSpeed + (presentLevel*10);
	this.bombFrequency = this.settings.bombFrequency + (presentLevel * 0.05);
	

	//Creating UFOS
	const lines = this.settings.ufoLines;
	const columns = this.settings.ufoColumns;
	const ufoInitial = [];

	let line ,column;

	for(line =0 ;line<lines;line++){

		for(column =0; column <columns;column++){

			this.object = new Objects();
			let x,y;
			x = (play.width/2)+(column*70) - ((columns-1)*35);
			y = (play.playBoundaries.top +30)+(line*50);
			ufoInitial.push(this.object.ufo(x,y,line,column,this.ufo_image));

		} 
	}
	this.ufos= ufoInitial;
	this.temp =0;


};

InGamePosition.prototype.keyDown = function(play,keyboardCode){

		if(keyboardCode == 77){
			play.sounds.mute();
		}

		if(keyboardCode == 80){
			play.pushPosition(new PausePosition());
		}
	


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

	//draw bombs
	ctx.fillStyle = '#ff0000';
	for(let i=0;i<this.bombs.length;i++){
		let bomb = this.bombs[i];
		ctx.fillRect(bomb.x-2,bomb.y,4,6);
	}

	//draw Sound and Mute info 
	ctx.font = "20px Arial";

	ctx.fillStyle = "424242";
	ctx.textAlign = "left";
	ctx.fillText("Press m to Mute:",play.playBoundaries.left,play.playBoundaries.bottom +70);

	/*let soundStatus = (play.sounds.muted == true)?"OFF":"NO";
	ctx.fillStyle = (play.sounds.muted == true ):"#FF0000":"#006121";
	ctx.fillText(soundStatus,play.playBoundaries.left + 375,play.playBoundaries.bottom + 70);
*/
	ctx.fillStyle = "424242";
	ctx.textAlign = "right";
	ctx.fillText("Press p to pause ",play.playBoundaries.right , play.playBoundaries.bottom + 70);


	//showing score and level

	ctx.font = "bold 24px Arial";
	ctx.fillText("Score",play.playBoundaries.right,play.playBoundaries.top - 75);
	ctx.fon = "bold 25px Arial";
	ctx.fillText(play.score,play.playBoundaries.right,play.playBoundaries.top -25);



	ctx.font = "bold 24px Arial";
	ctx.fillText("Level",play.playBoundaries.left ,play.playBoundaries.top - 75);
	ctx.fon = "bold 25px Arial";
	ctx.fillText(play.level,play.playBoundaries.left,play.playBoundaries.top -25);


	ctx.textAlign = "center";
	if(play.shields >0 ){
		ctx.fillStyle = "#BDBDBD";
		ctx.font = "bold 24px Arial";
		ctx.fillText("shields",play.width/2,play.playBoundaries.top - 75);
		ctx.font = "bold 25px Arial";
		ctx.fillText(play.shields,play.width/2,play.playBoundaries.top - 25);


	}
	else {
		ctx.fillStyle = '#ff4d4d';
		ctx.font = "bold 24px Arial";
		ctx.fillText("WARNING!",play.width/2,play.playBoundaries.top - 75);
		ctx.fillStyle = "#BDBDBD";
		ctx.fillText("No Shields left !",play.width/2,play.playBoundaries.top - 25)
	}
};