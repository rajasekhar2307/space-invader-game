class GameOverPosition {
	constructor() {
	}
	draw(play) {
		ctx.clearRect(0, 0, play.width, play.height);
		ctx.font = "60px Comfortaa";
		ctx.textAlign = "center";
		ctx.fillStyle = "#FFC100";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowColor = "#000";
		ctx.shadowBlur = 10;
		ctx.fillText("Game Over!", play.width / 2, play.height / 2 - 120);
		ctx.font = "40px Comfortaa";
		ctx.fillStyle = "#F0E3C5";
		ctx.fillText("Your Score   :  " + play.score + ".", play.width / 2, play.height / 2 - 20);
		ctx.font = "36px Comfortaa";
		ctx.fillStyle = "#FFC100";
		ctx.fillText("Press 'Space' to continue ", play.width / 2, play.height / 2 + 240);
	}
	keyDown(play, keyboardCode) {
		if (keyboardCode == 32) {
			play.goToPosition(new OpeningPosition());
		}
	}
}


