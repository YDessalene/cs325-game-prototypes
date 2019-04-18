window.onload = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    game.state.add("PreloadBar",preloadbars)
    game.state.add("Boot",bootGame);
    game.state.add("Stage1",startStage1);
    game.state.add("Stage2",startStage2);
    game.state.add("Stage2Fight",startStage2Fight);
    game.state.add("Stage2-2",continueStage2);
    game.state.add("Stage3",startStage3);
    game.state.add("GameOver",gameOver);
    game.state.start("PreloadBar");
}