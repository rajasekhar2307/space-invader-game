class TransferPosition {
	constructor(level) {
		this.level = level;
		this.fontSize = 140;
		this.fontColor = 255;
	}
	update(play) {
		this.fontSize -= 1;
		this.fontColor -= 1.5;
		if (this.fontSize < 1) {
			play.goToPosition(new InGamePosition(play.settings, this.level));
		}
	}
	draw(play) {
		ctx.clearRect(0, 0, play.width, play.height);
		//ctx.font = "40px Arial";
		ctx.font = this.fontSize + "px Arial";
		ctx.textAlign = "center";
		//ctx.fillStyle = '#D7DF01';
		ctx.fillStyle = "rgba(255, " + this.fontColor + "," + this.fontColor + ",1)";
		ctx.fillText("Level  " + this.level, play.width / 2, play.height / 2);
	}
}
;

