var startStage2Fight = function(game) {};

startStage2Fight.prototype = {
	preload: function () {
		this.game.load.spritesheet('player', 'assets/Characters/player.png', 48, 74, 12);
		this.game.load.image('background', 'assets/Background/forestbattle.png');
		this.game.load.image('fairybattler', 'assets/Background/fairybattler.png');
		this.game.load.image('textbox4', 'assets/Characters/textbox4.png');
		this.game.load.image('flee', 'assets/Characters/flee.png');
		this.game.load.image('kick', 'assets/Characters/kick.png');
		this.game.load.image('punch', 'assets/Characters/punch.png');

		this.game.load.audio('fightmusic', ['assets/Audio/Battle-Dawn_loop.m4a', 'assets/Audio/Battle-Dawn_loop.ogg']);
	},

	create: function () {
		playing = false;
		var background = this.game.add.sprite(0,0,'background');
		background.height = window.innerHeight;
		background.width = window.innerWidth;

		var battler = this.game.add.sprite(70,230, 'fairybattler');
		battler.scale.setTo(1.5,1.5);

		player = this.game.add.sprite(600, 350, 'player');
		player.frame = 4;

		textbox = this.game.add.sprite(240, 480, 'textbox4');
		textbox.visible = false;

		music = this.game.add.audio('fightmusic');
		music.play();

		this.game.add.button(605,530,'flee',this.flee);
		this.game.add.button(550,480,'punch',this.attack);
		this.game.add.button(660,480,'kick',this.attack);
	},

	flee: function () {
		music.stop()
		this.game.state.start("GameOver");
	},

	attack: function () {
		textbox.visible = true;
	}
}