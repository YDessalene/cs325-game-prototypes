var winGame = function() {}

winGame.prototype = {
	preload: function() {
		this.game.load.image('background', 'assets/Background/classroom.png');
	},
	create: function() {
		this.game.add.sprite(0, 0, 'background');
		this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.addOnce(this.restart, this);
		this.game.add.text(400, 200, 'Winner!\nPress R to restart', { fontSize: '32px', fill: '#000000' });
	},

	restart: function() {
		this.game.state.start("Boot");
	}
}