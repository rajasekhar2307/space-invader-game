

class PausePosition {
	constructor() {
	}
	draw(play) {
		ctx.clearRect(0, 0, play.width, play.height);
		ctx.font = 'bold 40px Comfortaa';
		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowColor = "#000";
		ctx.shadowBlur = 10;
		ctx.fillText("Paused", play.width / 2, play.height / 2 - 300);
		ctx.fillStyle = "#FFC100";
		ctx.font = "36px Comfortaa";
		ctx.fillText("Score : " + play.score, play.width / 2, play.height / 2 - 160);
		ctx.fillText("Resume :   P", play.width / 2, play.height / 2 - 110);
		ctx.fillText("ESC :   Restart ", play.width / 2, play.height / 2 - 60);
		ctx.font = "50px Comfortaa";
		ctx.fillStyle = "#ff0000";
		ctx.fillText("Controls: ", play.width / 2, play.height / 2 + 50);
		ctx.fillStyle = "#FFC100";
		ctx.font = "36px Comfortaa";
		ctx.fillText("<-  :  Left", play.width / 2, play.height / 2 + 120);
		ctx.fillText("->  :  Right ", play.width / 2, play.height / 2 + 190);
		ctx.fillText("Space  : Shoot ", play.width / 2, play.height / 2 + 260);
	}
	keyDown(play, keyboardCode) {
		if (keyboardCode == 80) {
			play.popPosition();
		}
		else if (keyboardCode == 27) {
			play.pushPosition(new GameOverPosition());
		}
	}
}


