Engine.Screen = class Screen {
	get width() {
		return this.canvas.width;
	}

	get height() {
		return this.canvas.height;
	}

	get events() {
		return {};
	}

	constructor(game) {
		this.age = 0;
		this.creation = new Date().getTime();
		this.game = game;
		this.canvas = game.canvas;
		this.keyStates = game.keyStates;
		this.assets = _.clone(game.assets);
		this.layers = [];
	}

	initialize() {
		return this;
	}

	update(span) {
		this.layers.forEach(layer => {
			layer.age += span;
			layer.update(span);
		});
	}

	draw(context) {
		this.layers.forEach(layer => {
			layer.draw(context);
		});
	}

	appendLayer(Layer, ...layerArgs) {
		const layer = new Layer(this, ...layerArgs);
		this.layers.push(layer);
		layer.initEventListeners();
	}

	prependLayer(Layer, ...layerArgs) {
		const layer = new Layer(this, ...layerArgs);
		this.layers.unshift(layer);
		layer.initEventListeners();
	}

	removeLayer(layer) {
		this.layers = _.without(this.layers, layer);
		layer.disposeEventListeners();
	}

	initEventListeners() {
		_.each(this.events, (listener, event) => {
			this.game.addEventListener(event, this[listener], this);
		});

		this.layers.forEach(layer => layer.initEventListeners());
	}

	disposeEventListeners() {
		_.each(this.events, (listener, event) => {
			this.game.removeEventListener(event, this[listener], this);
		});

		this.layers.forEach(layer => layer.disposeEventListeners());
	}


}
