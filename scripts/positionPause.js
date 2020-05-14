

function PausePosition() {


}

PausePosition.prototype.draw = function(play){

	ctx.clearRect(0,0,play.width,play.height);
	ctx.font = '40px Arial';
	ctx.fillStyle = '#ffffff';
	ctx.textAlign = 'center';
	ctx.fillText("Paused",play.width/2,play.height/2 - 300);

	ctx.fillStyle = "#D7DF01";
	ctx.font = "36px Arial";
	ctx.fillText("P: Resume ",play.width/2,play.height/2-250);
	ctx.fillText("ESC: to Restart ",play.width/2,play.height/2-210);

	ctx.font = "40px Arial";
	ctx.fillStyle = "#D7DF01";
	ctx.fillText("COntrols: ",play.width/2,play.height/2-120);
	ctx.font = "36px Arial";
	ctx.fillText("Left Arroe : left",play.width/2,play.height/2-70);
	ctx.fillText("RIght Arrow : Right ",play.width/2,play.height/2-30);
	ctx.fillText("Space : Shoot ",play.width/2,play.height/2+10);

};

PausePosition.prototype.keyDown = function(play,keyboardCode){

	if(keyboardCode == 80){
		play.popPosition();
	}
	else if (keyboardCode == 27 ){
		play.pushPosition(new GameOverPosition());
	}

};