Game.Screens.Play.Snake = class Snake extends Engine.Layer {
	constructor(screen, snakes = []) {
		super(screen);

		this.snakes = [
			new Game.Entities.Snake(
				this.width / 4,
				this.height / 4,
				50,
				Math.PI / 4,
				100,
				'FireBrick',
				this.keyStates,
				{
					score: snakes[0] && snakes[0].score,
					keys: {
						left: 65,
						right: 68
					}
				}
			),
			new Game.Entities.Snake(
				this.width / 4 * 3,
				this.height / 4 * 3,
				50,
				(-Math.PI / 4) * 3,
				100,
				'DodgerBlue',
				this.keyStates,
				{
					score: snakes[1] && snakes[1].score,
					keys: {
						left: 37,
						right: 39
					}
				}
			)
		];

		screen.appendLayer(Game.Screens.Play.Score, this.snakes);
	}

	draw(context) {
		this.snakes.forEach(snake => snake.draw(context));
	}

	update(span) {
		if(!this.snakes.length) {
			return;
		}

		const snakes = this.snakes.slice();

		snakes.forEach((snake, index) => {
			snake.update(span, this.width, this.height);

			if(snake.getSelfIntersection()) {
				return this.snakes.splice(index, 1);
			}

			snakes.forEach((opponent) => {
				if(opponent === snake) {
					return;
				}
				if(snake.getSnakeIntersection(opponent)) {
					return this.snakes.splice(index, 1);
				}
			})
		});

		if(this.snakes.length > 1 || this.matchFinished) {
			return;
		}

		const winner = this.snakes[0];
		if(winner) {
			winner.score++;
		}

		this.screen.appendLayer(Game.Screens.Play.Win, snakes, winner);

		this.matchFinished = true;
	}
}
