var boot = function(game) {};
var test = 1;
boot.prototype = {
    preload: function() {
        this.game.load.image('player1','assets/F5S4.png');
        //this.game.load.image('player2','');
    },
    create: function() {
        console.log("in boot");
        this.game.add.image(100,100,'player1');
        this.game.state.start('TheGame');
    }
}   