var bootGame = function(game) {};

bootGame.prototype = {
	create: function() {
		this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.addOnce(this.startG, this);
		this.game.add.text(250, 100, 'Press S to start:\n\nEscape your last day\nof school by dodging\nthe teachers!', { fontSize: '32px', fill: '#ffffff' });
	},

	startG: function() {
		this.game.state.start("TheGame");
	}
}