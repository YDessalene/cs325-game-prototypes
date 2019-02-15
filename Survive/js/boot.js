var bootGame = function(game) {};

bootGame.prototype = {
	create: function() {
		this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.addOnce(this.startGame, this);
		var scoreText = this.game.add.text(250, 100, 'Press S to start:\n\nYou have 5 seconds to\ncreate a player with C, or remove\nwith R\n\nPlayer1: Up, Left, Right\nPlayer2: W, A, D\nPlayer3: Y, G, J\nPlayer4: 8, 4, 6', { fontSize: '32px', fill: '#ffffff' });
	},

	startGame: function() {
		this.game.state.start("TheGame");
	}
}   