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

	this.setting = {

		//game settings
		updateSeconds: (1/60),
	};

	//collect the different positions and states os the game
	this.positionContainer = [];
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

	setInterval(function(){gameLoop(play);},this.setting.updateSeconds * 1000);
	//go to the Opening position
	this.goToPosition(new OpeningPosition());
};

const play = new GameBasics(canvas);
play.start();

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