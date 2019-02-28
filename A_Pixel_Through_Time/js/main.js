window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
    
    game.state.add("Boot", bootGame);
    game.state.add("Stage1",startStage1);
    game.state.add("Stage2",startStage2);
    game.state.add("GameOver",gameOver);
    game.state.start("Stage1");
}