var startStage2Fight = function(game) {};

startStage2Fight.prototype = {

	create: function () {
		playing = false;
		var background = this.game.add.sprite(0,0,'forestfight');
		background.height = window.innerHeight;
		background.width = window.innerWidth;

		var battler = this.game.add.sprite(70,230, 'fairybattler');
		battler.scale.setTo(1.5,1.5);

		player = this.game.add.sprite(600, 350, 'player-fighter');
		player.animations.add('idle', [0,1,2], 7, true);
		player.animations.add('punch', [3,4,5], 7, false);
		player.animations.add('kick', [6,7,8], 7, false);

		textbox = this.game.add.sprite(240, 480, 'fight-textbox1');
		textbox.visible = false;

		this.game.add.button(605,530,'flee',this.flee);
		this.game.add.button(550,480,'punch',this.punch);
		this.game.add.button(660,480,'kick',this.kick);

		timer = this.game.time.create(false);
		timer.loop(500, this.idle, this);
		timer.start();

		enemyHealth = this.game.add.sprite(50, 50, 'health');
		enemyHealth.width = 300; enemyHealth.height = 25;
		playerHealth = this.game.add.sprite(450, 50, 'health');
		playerHealth.width = 300; playerHealth.height = 25;

		player.animations.play('idle');

		music = this.game.add.audio('fightmusic');
		music.volume = .3;
		music.play();
	},

	idle: function () {
		timer.pause();
		player.animations.play('idle');
	},

	flee: function () {
		music.stop()
		this.game.state.start("Stage2-2");
	},

	punch: function () {
		player.animations.play('punch');
		timer.resume();
		textbox.visible = true;
	},

	kick: function () {
		player.animations.play('kick');
		timer.resume();
		textbox.visible = true;
	}
}