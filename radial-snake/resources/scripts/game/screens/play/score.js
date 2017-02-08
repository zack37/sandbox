Game.Screens.Play.Score = class Score extends Engine.Layer {
	constructor(screen, snakes) {
		super(screen);

		this.snakes = snakes;
		this.scoreSprites = [];
		this.scores = [];

		snakes.forEach((snake, index) => snake.index = index);
	}

	draw(context) {
		this.scoreSprites.forEach(scoreSprite => scoreSprite.draw(context));
	}

	update(span) {
		this.snakes.forEach(snake => {
			const index = snake.index;
			if(this.scores[index] === snake.score) {
				return;
			}

			this.scoreSprites[index] = this.createScoreSprite(snake);
			this.scores[index] = snake.score;
		})
	}

	createScoreSprite(snake) {
		const minecraftiaFont = this.assets.minecraftiaFont;
		minecraftiaFont.save();
		minecraftiaFont.color = snake.color;

		const scoreTexture = minecraftiaFont.createTexture(''+snake.score, { noOffsets: true, noSpaces: true });

		const scoreSprite = new Engine.Sprite(scoreTexture);
		scoreSprite.setPercentage('width', this.width, 4, 'height');
		if(snake.index === 0) {
			scoreSprite.align = 'top-left';
		}
		else if (snake.index === 1) {
			scoreSprite.align = 'top-right';
			scoreSprite.x = this.width;
		}

		minecraftiaFont.restore();
		return scoreSprite;
	}
}
