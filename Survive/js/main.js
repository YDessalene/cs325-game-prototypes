window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
	
	game.state.add("TheGame",thegame);
	game.state.add("GameOver",gameover);
	game.state.start("TheGame");
}