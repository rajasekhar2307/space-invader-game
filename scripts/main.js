const canvas = document.getElementById('ufoCanvas');
const ctx = canvas.getContext('2d');


canvas.width = 900;
canvas.height = 750;

function resize() {

	const height = window.innerHeight - 20;

	const ratio = canvas.width/canvas.height;

	width = ratio*height;

	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
}

window.addEventListener('load',resize,false);


function GameBasics(canvas){

	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;


	//active playing field
	this.playBoundaries = {
		top: 150,
		bottom: 650,
		left : 100,
		right:800

	};

	//initial values
	this.level = 10;
	this.score = 0;
	this.shields = 2;

	this.settings = {

		//game settings
		updateSeconds: (1/60),
		spaceshipSpeed: 200,
		bulletSpeed: 130,
		bulletMaxFrequency: 250,

		ufoLines : 4,
		ufoColumns: 8,
		ufoSpeed: 35,
		ufoSinkingValue : 30,//value of sinking

		bombSpeed:75,
		bombFrequency : 0.05,

		pointsPerUFO : 25,

	};

	//collect the different positions and states os the game
	this.positionContainer = [];

	//store pressed keys
	this.pressedKeys ={};
}

//Return to the current game position,status,always returns to the top of the position container
GameBasics.prototype.presentPosition = function() {
	return this.positionContainer.length > 0? this.positionContainer[this.positionContainer.length -1] : null;
};


//go to the desired position
GameBasics.prototype.goToPosition = function (position){

	//if we are already ina position clear the positionContainer
	if(this.presentPosition()){
		this.positionContainer.length =0;
	}

	//if we find an 'entry' in a given position , we call it
	if(position.entry){
		position.entry(play);
	}

	//setting the current game position in the positionContainer
	this.positionContainer.push(position);

};

//push our new position to the positionContainer
GameBasics.prototype.pushPosition = function(position){
	this.positionContainer.push(position);
};


//pop the position from the positionContainer
GameBasics.prototype.popPosition = function(position){
	this.positionContainer.pop();
};


GameBasics.prototype.start = function(){

	setInterval(function(){gameLoop(play);},this.settings.updateSeconds * 1000);
	//go to the Opening position
	this.goToPosition(new OpeningPosition());
};




//notifies the game when the key is pressed
GameBasics.prototype.keyDown = function(keyboardCode){
	//store the pressed key in the pressedkeys
	this.pressedKeys[keyboardCode]= true;
	//console.log(this.pressedKeys);
	//it calls the present postion keyDown function
	if(this.presentPosition() && this.presentPosition().keyDown){
		this.presentPosition().keyDown(this,keyboardCode);
	}
};


GameBasics.prototype.keyUp = function(keyboardCode){
	//delete the released key from the pressedkeys
	delete this.pressedKeys[keyboardCode];
};

function gameLoop(play){

	let presentPosition = play.presentPosition();

	if(presentPosition){

		//update
		if(presentPosition.update){
			presentPosition.update(play);
		}
		//draw
		if(presentPosition.draw){
			presentPosition.draw(play);
		}
	}
}

window.addEventListener("keydown",function(e){
	const keyboardCode = e.which || event.keyCode;
	if(keyboardCode == 37 || keyboardCode == 39 || keyboardCode ==32){e.preventDefault();}
	play.keyDown(keyboardCode);

});

window.addEventListener("keyup",function(e){
	const keyboardCode = e.which || event.keyCode ;
	play.keyUp(keyboardCode);

});


const play = new GameBasics(canvas);
play.sounds = new Sounds();
play.sounds.init();
play.start();