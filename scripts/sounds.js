
function Sounds(){

	this.muted = false;

}

Sounds.prototype.init = function(){

	this.sound = new Audio();
	this.sound.src = "sounds/bullet_shot.mp3";
	this.sound.setAttribute("preload","auto");

	this.sound2 = new Audio();
	this.sound2.src = "sounds/explosion.mp3";
	this.sound2.setAttribute("preload","auto");

	this.sound3 = new Audio();
	this.sound3.src = "sounds/ufo.mp3";
	this.sound3.setAttribute("preload","auto");

};

Sounds.prototype.playSound = function(soundName){

	if(this.muted ==true ){
		return ;
	}

	if(soundName == 'bullet_shot'){
		this.sound.play(); 
		this.sound.currentTime = 0;
	}

	if(soundName == 'explosion'){
		this.sound2.play(); 
		this.sound2.currentTime = 0;
	}

	if(soundName == 'ufo'){
		this.sound3.play(); 
		this.sound3.currentTime = 0;
	}

};

Sounds.prototype.mute = function(){

	if(this.muted == false ){

		this.muted = true;
	}
	else if (this.muted == true ){

		this.muted = false;
	}

};