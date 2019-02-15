var gameover = function(game) {};

gameover.prototype = {

	create: function() {
		this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.addOnce(this.restart, this);
		var scoreText = this.game.add.text(250, 200, 'Press R to restart', { fontSize: '32px', fill: '#ffffff' });
	},

	restart: function() {
		this.game.state.start("Boot");
	}
}