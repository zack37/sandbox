Game.Screens.Play.Win = class Win extends Engine.Layer {
	constructor(screen, snakes, winner) {
		super(screen);

		this.snakes = snakes;
		this.winner = winner;

		this.ttl = 3000;

		let text, percent;
		if(this.winner) {
			text = this.winner.color.toUpperCase() + ' SNAKE WINS';
			percent = 40;
		}
		else {
			text = 'TIE',
			percent = 15;
		}

		const winnerTexture = this.assets.minecraftiaFont.createTexture(text);
		this.winnerSprite = new Engine.Sprite(winnerTexture);
		this.winnerSprite.align = 'center';
		this.winnerSprite.setPercentage('width', this.width, percent, 'height');
		this.winnerSprite.x = this.width / 2;
		this.winnerSprite.y = this.height / 2;
	}

	draw(context) {
		this.winnerSprite.draw(context);
	}

	update(span) {
		if(this.age < this.ttl) {
			return;
		}
		this.screen.game.changeScreen(Game.Screens.Play, this.snakes);
	}
}
