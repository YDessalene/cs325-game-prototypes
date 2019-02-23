var bootGame = function(game) {};

bootGame.prototype = {
	preload: function() {
		this.game.load.image('background', 'assets/Background/classroom.png');
	},
	create: function() {
		this.game.add.sprite(0, 0, 'background');
		this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.addOnce(this.startG, this);
		this.game.add.text(400, 150, 'Press S to start:\nEscape your last day\nof school by dodging\nthe teachers!', { fontSize: '32px', fill: '#000000' });
	},

	startG: function() {
		this.game.state.start("TheGame");
	}
}