var bootGame = function(game) {};

var player, fairy, enemy;
var music, playing;
var pFaceNorth,pFaceEast,pFaceSouth,pFaceWest = false;
var map;
var floor,overFloor,wall,colide,colidetop,entrance,exit;
var textboxNum;
var textbox;
var nextText;
var start;
var timer;
var playerHealth,enemyHealth;

bootGame.prototype = {
	preload: function() {
		preloadBar = this.add.sprite(300, 400, 'loadbar');
		this.game.load.setPreloadSprite(preloadBar);

		this.game.load.spritesheet('new-player', 'assets/Characters/pre-main-characters.png', 48, 48, 96);
		this.game.load.spritesheet('player', 'assets/Characters/main-characters.png', 48, 48, 96);
		this.game.load.spritesheet('player-fighter', 'assets/Characters/player-fight.png', 64, 64, 54);
		this.game.load.spritesheet('fairy', 'assets/Characters/fairies.png', 48, 48, 96);
		this.game.load.spritesheet('enemies', 'assets/Characters/enemy.png', 96, 96, 96);
		this.game.load.spritesheet('mini-enemies', 'assets/Characters/mini-enemies.png', 48, 48, 96);

		this.game.load.audio('gamemusic', ['assets/Audio/main-theme_loop.m4a', 'assets/Audio/main-theme_loop.ogg']);
		this.game.load.audio('fightmusic', ['assets/Audio/Battle-Dawn_loop.m4a', 'assets/Audio/Battle-Dawn_loop.ogg']);
		this.game.load.audio('forestmusic', ['assets/Audio/Elven-Sanctuary_loop.m4a', 'assets/Audio/Elven-Sanctuary_loop.ogg']);

		this.game.load.tilemap('map1', 'assets/Background/stage1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map2', 'assets/Background/stage2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map3', 'assets/Background/stage3.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tile1', 'assets/Background/FireCave.png');
		this.game.load.image('tile2', 'assets/Background/ForestCave.png');
		this.game.load.image('tile3', 'assets/Background/ForestCave2.png');
		this.game.load.image('tile4', 'assets/Background/WaterTiles.png');
		this.game.load.image('tile5', 'assets/Background/ForestCave3.png');
		this.game.load.image('tile6', 'assets/Background/ForestCave4.png');
		this.game.load.image('gianttree', 'assets/Background/GiantTree.png');
		this.game.load.image('forestfight', 'assets/Background/forestbattle.png');
		this.game.load.image('fairybattler', 'assets/Background/fairybattler.png');
		this.game.load.image('cerberus', 'assets/Background/cerberus.png');
		this.game.load.image('mushroom', 'assets/Background/mushroom.png');
		this.game.load.image('tree', 'assets/Background/tree.png');

		var i = 0;
		for(i = 0; i < 27; i++) {
			this.game.load.image('textbox'+i, 'assets/Textboxes/textbox'+i+'.png');
		}
		this.game.load.image('fight-textbox1', 'assets/Textboxes/fight-textbox1.png');
		this.game.load.image('flee', 'assets/Textboxes/flee.png');
		this.game.load.image('kick', 'assets/Textboxes/kick.png');
		this.game.load.image('punch', 'assets/Textboxes/punch.png');
		this.game.load.image('health', 'assets/Background/healthbar.png');
	},
	create: function() {
		this.game.state.start("Stage3");
	}
}