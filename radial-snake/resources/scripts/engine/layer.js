Engine.Layer = class Layer {

	get width() {
		return this.canvas.width;
	}

	get height() {
		return this.canvas.height;
	}

	get events() {
		return {};
	}

	constructor(screen) {
		this.age = 0;
		this.creation = new Date().getTime();
		this.screen = screen;
		this.game = screen.game;
		this.assets = screen.assets;
		this.keyStates = screen.keyStates;
		this.canvas = screen.game.canvas;
	}

	update(span) {}

	draw(context) {}

	initEventListeners() {
		_.each(this.events, (listener, event) => {
			this.game.addEventListener(event, this[listener], this);
		});
	}

	disposeEventListeners() {
		_.each(this.events, (listener, event) => {
			this.game.removeEventListener(event, this[listener]);
		});
	}

}
