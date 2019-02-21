window.onload = function() {
    var game = new Phaser.Game(913, 768, Phaser.AUTO, 'game');
    
    game.state.add("Boot", bootGame);
    game.state.add("TheGame",startGame);
    game.state.add("GameOver",gameOver);
    game.state.start("TheGame");
}