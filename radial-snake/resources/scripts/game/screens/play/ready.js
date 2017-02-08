Game.Screens.Play.Ready = class Ready extends Engine.Layer {
	get events() {
		return {
			'keydown': 'onKeyDown'
		};
	}

	constructor(screen, snakes) {
		super(screen);

		this.snakes = snakes;

		const readyTexture = this.assets.minecraftiaFont.createTexture('Ready');
		const readySprite = new Engine.Sprite(readyTexture);
		readySprite.align = 'center';
		readySprite.setPercentage('width', this.width, 15, 'height');

		this.readyAnim = new Engine.Animations.Keyframe(readySprite, [
			{
				x: this.width / 2,
				y: this.height / 2,
				opacity: 1,
				frame: 0
			},
			{
				y: this.height / 3,
				opacity: 0,
				frame: 700
			}
		]);

		const directionsTexture = this.assets.minecraftiaFont.createTexture('Red player use A and D, blue player use Arrow keys');
		const directionsSprite = new Engine.Sprite(directionsTexture);
		directionsSprite.align = 'center';
		directionsSprite.setPercentage('width', this.width, 30, 'height');

		this.directionsAnim = new Engine.Animations.Keyframe(directionsSprite, [
			{
				x: this.width / 2,
				y: this.height / 2 + 55,
				opacity: 1,
				frame: 0
			},
			{
				y: this.height / 3 + 55,
				opacity: 0,
				frame: 700
			}
		]);
	}

	draw(context) {
		this.readyAnim.draw(context);
		this.directionsAnim.draw(context);
	}

	update(span) {
		if(!this.ready) {
			return;
		}

		if(this.readyAnim.playing) {
			this.readyAnim.update(span);
			this.directionsAnim.update(span);
		}
		else {
			this.screen.removeLayer(this);
		}
	}

	onKeyDown() {
		this.disposeEventListeners();

		this.ready = true;
		this.readyAnim.play();
		this.directionsAnim.play();
		this.screen.prependLayer(Game.Screens.Play.Snake, this.snakes);
	}
}
