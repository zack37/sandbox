Game.Screens.Play = class Play extends Engine.Screen {
	get events() {
		return {
			'keydown': 'onKeyDown'
		}
	}

	initialize(game, snakes) {
		this.appendLayer(Game.Screens.Play.Ready, snakes);
	}

	load(assetsLoader) {
		const logoTexture = assetsLoader.texture('/textures/logo');

		this.game.extendAssets({ logoTexture });
	}

	onKeyDown() {
		if(this.keyStates.get(27)) {
			this.game.changeScreen(Game.Screens.Menu);
		}
	}
}
