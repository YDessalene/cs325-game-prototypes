var startStage1 = function(game) {};
var player;
var music;
var pFaceNorth,pFaceEast,pFaceSouth,pFaceWest = false;
var map;
var floor,wall,colide,cave;
var platforms, nextStage;
var start = false;
var textboxNum = 1;
var textbox = null;
var nextText;

startStage1.prototype = {

	preload: function() {
		this.game.load.spritesheet('player', 'assets/Characters/player.png', 48, 75, 12);
		this.game.load.tilemap('map', 'assets/Background/ForestCave.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tile1', 'assets/Background/Firecave.png');
		this.game.load.image('tile2', 'assets/Background/ForestCave.png');
		this.game.load.image('tile3', 'assets/Background/ForestCave2.png');
		this.game.load.image('tile4', 'assets/Background/ForestCave3.png');
		this.game.load.image('collision', 'assets/Background/platform.png');

		this.game.load.image('textbox1', 'assets/Characters/textbox1.png');
		this.game.load.image('textbox2', 'assets/Characters/textbox2.png');
		this.game.load.image('textbox3', 'assets/Characters/textbox3.png');
	},

	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		map = this.game.add.tilemap('map');
		map.addTilesetImage('Firecave', 'tile1');
		map.addTilesetImage('ForestCave', 'tile2');
		map.addTilesetImage('ForestCave2', 'tile3');
		map.addTilesetImage('ForestCave3', 'tile4');

		floor = map.createLayer('Background');
		floor.resizeWorld();

		wall = map.createLayer('Wall');
		wall.resizeWorld();
		//wall.debug = true;

		colide = map.createLayer('Colide');
		colide.resizeWorld();
		//colide.debug = true;

		cave = map.createLayer('Entrance');
		cave.resizeWorld();
		//cave.debug = true;

		platforms = this.game.add.group();
    	platforms.enableBody = true;
    	nextStage = this.game.add.group();
    	nextStage.enableBody = true;
		this.addWalls();

		player = this.game.add.sprite(370, 550, 'player');
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.frame = 1;

		player.animations.add('down', [0,1,2], 10, true);
		player.animations.add('left', [3,4,5], 10, true);
	    player.animations.add('right', [6,7,8], 10, true);
	    player.animations.add('up', [9,10,11], 10, true);
		
		this.game.camera.follow(player);

		textbox = this.game.add.sprite(0, 630, 'textbox1');
	},

	update: function() {
		//if(this.game.input.keyboard.addKey(Phaser.Keyboard.Z).isDown)
			//map.swap(0,674);

		/***********Not Working**********************/
		//this.game.physics.arcade.collide(player, wall);
		//this.game.physics.arcade.collide(player, colide);
		//this.game.physics.arcade.collide(player, cave);
		/********************************************/
		if(this.game.physics.arcade.collide(player, nextStage))
			this.goStage2();

		this.game.physics.arcade.collide(player, platforms);

		if(start)
			this.movePlayer();
		else
			this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.spawnText, this);

		console.log(start);
	},

	spawnText: function() {
		textbox.kill();

		if(textboxNum == 2) 
			textbox = this.game.add.sprite(0, 630, 'textbox2');
		else if(textboxNum == 3) 
			textbox = this.game.add.sprite(0, 630, 'textbox3');
		else
			start = true;

		textboxNum++;
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

	addWalls: function() {
		var walls = platforms.create(0, 690, 'collision');
    	walls.width = 800;
    	walls.body.immovable = true;
    	walls.visible = false;

    	var walls = platforms.create(0, 170, 'collision');
    	walls.width = 800;
    	walls.body.immovable = true;
    	walls.visible = false;

    	var walls = nextStage.create(350, 170, 'collision');
    	walls.width = 90;
    	walls.body.immovable = true;
    	walls.visible = false;
	},

	goStage2: function() {
		this.game.state.start("Stage2");
	}
}