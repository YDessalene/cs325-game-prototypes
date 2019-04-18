var gameOver = function(game) {};

gameOver.prototype = {
	create: function() {
		music.stop();
		this.game.add.text(200, 200, 'To Be Continued...\n\nPress R to restart scenes', { fontSize: '32px', fill: '#ffffff' });
		this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.addOnce(this.restart, this);
	},

	restart: function() {
		this.game.state.start("Stage1");
	}
}
