var gameover = function(game) {};

gameover.prototype = {

	create: function() {
		this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.addOnce(this.restart, this);
	},

	restart: function() {
		this.game.state.start("TheGame");
	}
}