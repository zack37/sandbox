Game.Screens.Splash = class Splash extends Engine.Screen {
	initialize() {
		const splashSprite = new Engine.Sprite(this.assets.splashTexture);
		splashSprite.align = 'center';
		splashSprite.x = this.width / 2;

		this.splashAnim = new Engine.Animations.Keyframe(splashSprite, [
			{
				y: (this.height / 2) - 30,
				width: splashSprite.width / 4,
				height: splashSprite.height / 4,
				opacity: 0,
				easing: 'in',
				frame: 0
			},
			{
				y: this.height / 2,
				width: (splashSprite.width / 3) + (splashSprite.width * 0.05),
				height: (splashSprite.height / 3) + (splashSprite.height * 0.05),
				opacity: 1,
				frame: 3000
			},
			{
				frame: 3500
			}
		]);

		this.splashAnim.play();
	}

	load(assetsLoader) {
		const minecraftiaFont = assetsLoader.font('/fonts/minecraftia');
		const logoTexture = assetsLoader.texture('/textures/logo');
		const splashTexture = assetsLoader.texture('/textures/splash');

		this.game.extendAssets({ minecraftiaFont , logoTexture });
		return { splashTexture };
	}

	draw(context) {
		this.splashAnim.draw(context);
	}

	update(span) {
		if(this.splashAnim.playing) {
			this.splashAnim.update(span);
		}
		else {
			this.game.changeScreen(Game.Screens.Menu);
		}
	}
}
