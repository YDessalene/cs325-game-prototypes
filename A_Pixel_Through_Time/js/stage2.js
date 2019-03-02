var startStage2 = function(game) {};

var player, fairy;
var music;
var pFaceNorth,pFaceEast,pFaceSouth,pFaceWest = false;
var floor, colide;

startStage2.prototype = {

	preload: function() {
		this.game.load.spritesheet('player', 'assets/Characters/player.png', 48, 74, 12);
		this.game.load.spritesheet('fairy', 'assets/Characters/fairies.png', 48, 48, 96);
		this.game.load.tilemap('map', 'assets/Background/stage2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tile1', 'assets/Background/ForestCave2.png');
		this.game.load.image('tile2', 'assets/Background/ForestCave.png');
		this.game.load.image('collision', 'assets/Background/platform.png');
	},

	create: function() {
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

		player = this.game.add.sprite(450, 850, 'player');
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
		music.resume();
	},

	update: function() {
		if(this.game.physics.arcade.collide(player, nextStage))
			this.goStage3();

		if(this.game.physics.arcade.collide(player, fairy))
			this.goStage2Fight();

		this.movePlayer();
		
	},

	movePlayer: function() {
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		if(this.game.input.keyboard.addKey(Phaser.Keyboard.W).isDown || this.game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown) {
			player.body.velocity.y = -150;
			player.animations.play('up');

			pFaceNorth = true;
			pFaceSouth = false;
			pFaceWest = false;
			pFaceEast = false;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.S).isDown || this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown) {
			player.body.velocity.y = 150;
			player.animations.play('down');

			pFaceNorth = false;
			pFaceSouth = true;
			pFaceWest = false;
			pFaceEast = false;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.D).isDown || this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown) {
			player.body.velocity.x = 150;
			player.animations.play('right');

			pFaceNorth = false;
			pFaceSouth = false;
			pFaceWest = false;
			pFaceEast = true;
		}
		else if(this.game.input.keyboard.addKey(Phaser.Keyboard.A).isDown || this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown) {
			player.body.velocity.x = -150;
			player.animations.play('left');

			pFaceNorth = false;
			pFaceSouth = false;
			pFaceWest = true;
			pFaceEast = false;
		}
		
		else {
			if(pFaceNorth)
				player.frame = 10;
			if(pFaceEast)
				player.frame = 7;
			if(pFaceSouth)
				player.frame = 1;
			if(pFaceWest)
				player.frame = 4;
		}
	},

	goStage2Fight: function() {
		music.stop();
		this.game.state.start("Stage2Fight");
	},
}