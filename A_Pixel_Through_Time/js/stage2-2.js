var continueStage2 = function(game) {};

continueStage2.prototype = {

	preload: function () {
		this.game.load.spritesheet('player', 'assets/Characters/player.png', 48, 74, 12);
		this.game.load.spritesheet('fairy', 'assets/Characters/fairies.png', 48, 48, 96);
		this.game.load.tilemap('map', 'assets/Background/stage2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tile1', 'assets/Background/ForestCave2.png');
		this.game.load.image('tile2', 'assets/Background/ForestCave.png');
		this.game.load.image('collision', 'assets/Background/platform.png');
	},

	create: function() {
		start = false;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		map = this.game.add.tilemap('map');
		map.addTilesetImage('ForestCave2(48px)', 'tile1');
		map.addTilesetImage('ForestCave(48px)', 'tile2');

		floor = map.createLayer('Floor');
		floor.resizeWorld();

		colide = map.createLayer('Collision');
		colide.resizeWorld();

		platforms = this.game.add.group();
    	platforms.enableBody = true;
    	nextStage = this.game.add.group();
    	nextStage.enableBody = true;

    	var walls = nextStage.create(360,-20,'collision');
    	walls.width = 250;
    	walls.body.immovable = true;
    	walls.visible = false;

		player = this.game.add.sprite(455, 400, 'player');
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.frame = 10;

		fairy = this.game.add.sprite(455, 350, 'fairy');
		this.game.physics.arcade.enable(fairy);
		fairy.body.immovable = true;
		fairy.frame = 50;

		player.animations.add('down', [0,1,2], 10, true);
		player.animations.add('left', [3,4,5], 10, true);
	    player.animations.add('right', [6,7,8], 10, true);
	    player.animations.add('up', [9,10,11], 10, true);

	    fairy.animations.add('idle', [50,51,52], 10, true);
	    fairy.animations.play('idle');
		
		this.game.camera.follow(player);
	},
}