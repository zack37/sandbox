Game.Screens.Menu = class Menu extends Engine.Screen {
	get events() {
		return {
			'keydown': 'onKeyDown'
		};
	}

	initialize() {
		this.logoSprite = new Engine.Sprite(this.assets.logoTexture);
		this.logoSprite.setPercentage('width', this.width, 30, 'height');

		const instructionsTexture = this.assets.minecraftiaFont.createTexture('Press any key to start');
		const instructionsSprite = new Engine.Sprite(instructionsTexture);
		instructionsSprite.align = 'center';
		instructionsSprite.setPercentage('width', this.width, 35, 'height');
		instructionsSprite.x = this.width / 2;
		instructionsSprite.y = this.height / 2;

		this.instructionsAnim = new Engine.Animations.Keyframe(instructionsSprite, [
			{ opacity: 1, frame: 0 },
			{ opacity: 0, frame: 1500 }
		]);
		this.instructionsAnim.repetitionMode = 'full';
		this.instructionsAnim.play();
	}

	unload() {
		return 'logoTexture';
	}

	draw(context) {
		this.logoSprite.draw(context);
		this.instructionsAnim.draw(context);
	}

	update(span) {
		if(this.keyPressed) {
			this.game.changeScreen(Game.Screens.Play);
		}
		else {
			this.instructionsAnim.update(span);
		}
	}

	onKeyDown(e) {
		this.keyPressed = true;
	}
}
