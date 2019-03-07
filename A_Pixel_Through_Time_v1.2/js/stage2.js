var startStage2 = function(game) {};

startStage2.prototype = {

	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		map = this.game.add.tilemap('map2');
		map.addTilesetImage('ForestCave', 'tile2');
		map.addTilesetImage('ForestCave2', 'tile3');
		map.addTilesetImage('ForestCave3', 'tile5');
		map.addTilesetImage('ForestCave4', 'tile6');
		map.addTilesetImage('GiantTree', 'gianttree');


		floor = map.createLayer('Floor');
		floor.resizeWorld();

		overFloor = map.createLayer('Over_Floor');
		overFloor.resizeWorld();

		colide = map.createLayer('Collision');
		colide.resizeWorld();
		map.setCollisionBetween(0,2000,true,colide);
		//colide.debug = true;

		entrance = map.createLayer('Entrance');
		entrance.resizeWorld();
		map.setCollisionBetween(0,2000,true,entrance);
		//entrance.debug = true;

		exit = map.createLayer('Exit');
		exit.resizeWorld();
		map.setCollisionBetween(0,2000,true,exit);
		//exit.debug = true;

		player = this.game.add.sprite(460, 850, 'new-player');
		this.game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.frame = 1;
		player.body.setSize(32,12,8,36);
		this.game.camera.follow(player);

		player.animations.add('down', [0,1,2], 10, true);
		player.animations.add('left', [12,13,14], 10, true);
	    player.animations.add('right', [24,25,26], 10, true);
	    player.animations.add('up', [36,37,38], 10, true);

	    colidetop = map.createLayer('Collision_Tops');
		colidetop.resizeWorld();
		//colidetop.debug = true;

		fairy = this.game.add.sprite(460, 500, 'fairy');
		this.game.physics.arcade.enable(fairy);
		fairy.body.immovable = true;
		fairy.frame = 50;

	    fairy.animations.add('idle', [50,51,52], 10, true);
	    fairy.animations.play('idle');

	    music = this.game.add.audio('forestmusic');
		music.volume = .3;
		music.play();
	},

	update: function() {
		this.game.physics.arcade.collide(player, colide);

		if(this.game.physics.arcade.collide(player, entrance)) {
			start = false;
			player.animations.stop();
			player.frame = 37;
			textbox = this.game.add.sprite(100, 430, 'textbox0');			
			this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.textboxKill, this);
		}

		if(this.game.physics.arcade.collide(player, exit)) {
			start = false;
			player.animations.stop();
			player.frame = 1;
			textbox = this.game.add.sprite(100, 750, 'textbox0');			
			this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.textboxKill, this);
		}

		if(this.game.physics.arcade.collide(player, fairy)) {
			music.stop();
			this.game.state.start("Stage2Fight");
		}

		if(start)
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
				player.frame = 37;
			if(pFaceEast)
				player.frame = 25;
			if(pFaceSouth)
				player.frame = 1;
			if(pFaceWest)
				player.frame = 13;
		}
	},

	textboxKill: function() {
		textbox.kill();
		start = true;
	}
}