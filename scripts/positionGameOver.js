function GameOverPosition(){

}

GameOverPosition.prototype.draw = function(play){

	ctx.clearRect(0,0,play.width,play.height);
	ctx.font = "40px Arial";
	ctx.textAlign = "center";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Game Over!",play.width/2,play.height/2-120);


	ctx.font = "36px Arial";
	ctx.fillStyle = "#D7DF01";
	ctx.fillText("You have reached level: " + play.level+ ", Your Score - "+play.score+".",play.width/2,play.height/2-40);

	ctx.font = "36px Arial";
	ctx.fillStyle = "#D7DF01";
	ctx.fillText("Press Space to continue ",play.width/2,play.height/2+40);


};

GameOverPosition.prototype.keyDown = function(play,keyboardCode){

	if(keyboardCode == 32 ){

		play.goToPosition(new OpeningPosition());
	}
}