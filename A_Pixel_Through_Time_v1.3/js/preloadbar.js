var preloadbars = function(game) {};

preloadbars.prototype = {
	preload: function() {
		this.game.load.image('loadbar', 'assets/Background/preloader_bar.png');
		this.game.state.start("Boot");
	}
}