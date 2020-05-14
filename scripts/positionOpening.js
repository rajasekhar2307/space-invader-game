class OpeningPosition {
	constructor() {
	}
	draw(play) {
		ctx.clearRect(0, 0, play.width, play.height);
		ctx.font = "90px Karla";
		ctx.textAlign = "center";
		const gradient = ctx.createLinearGradient((play.width / 2 - 180), (play.height / 2), (play.width / 2 + 180), (play.height / 2));
		gradient.addColorStop("0", "#fff74b");
		gradient.addColorStop("0.5", "#26ff97");
		gradient.addColorStop("1.0", "#fff74b");
		ctx.fillStyle = gradient;
        /*ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 10;*/
		ctx.fillText("SPACE INVADER", play.width / 2, play.height / 2 - 70);
		//press space to start
		ctx.font = "40px Karla";
		ctx.fillStyle = "#fff";
		ctx.fillText("'Space' To start the game", play.width / 2, play.height / 2 + 70);
		//game controls
		ctx.fillText("How to play?", play.width / 2, play.height / 2 + 210);
		ctx.font = "35px Karla";
		ctx.fillStyle = "#fff";
		ctx.fillText("<- Move Left", play.width / 2, play.height / 2 + 260);
		ctx.fillText("-> Move Right", play.width / 2, play.height / 2 + 300);
		ctx.fillText("Space : Fire ", play.width / 2, play.height / 2 + 340);
	}
	keyDown(play, keyboardCode) {
		if (keyboardCode == 32) {
			play.level = 1;
			play.score = 0;
			play.shields = 2;
			play.goToPosition(new TransferPosition(play.level));
		}
	}
}



