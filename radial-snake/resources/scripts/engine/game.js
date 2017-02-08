Engine.Game = class Game {

	get fps() {
		return 1000/60;
	}

	get speed() {
		return 1;
	}

	constructor(canvas) {
		this.canvas = canvas;
		this.lastUpdate = this.creation = new Date().getTime();

		canvas.width = document.documentElement.clientWidth * .95;
		canvas.height = document.documentElement.clientHeight * .95;
		canvas.focus();

		canvas.addEventListener('mousedown', canvas.focus.bind(canvas), false);
		canvas.addEventListener('keydown', onKeyDown.bind(this), false);
		canvas.addEventListener('keyup', onKeyUp.bind(this), false);

		this.assets = {};
		this.events = new Map();
		this.screen = new Engine.Screen(this);
		this.keyStates = new Engine.KeyStates();
		this.context = canvas.getContext('2d');
		this.bufferedCanvas = document.createElement('canvas');
		this.bufferedContext = this.bufferedCanvas.getContext('2d');
		this.bufferedCanvas.width = canvas.width;
		this.bufferedCanvas.height = canvas.height;
	}

	draw() {
		this.context.restore();
		this.context.fillStyle = 'black';
		this.context.save();
		this.context.beginPath();
		this.context.rect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fill();
		this.drawScreen(this.context);
	}

	drawScreen(context) {
		if(this.screen.loading) {
			return;
		}
		if(this.screen.draw) {
			this.screen.draw(context);
		}
	}

	update() {
		const lastUpdate = this.lastUpdate;
		const currUpdate = this.lastUpdate = new Date().getTime();
		const span = currUpdate - lastUpdate;
		this.updateScreen(span / this.speed);
	}

	updateScreen(span) {
		this.screen.age += span;
		if(this.screen.loading) {
			return;
		}
		if(this.screen.update) {
			this.screen.update(span);
		}
	}

	loop() {
		if(!this.playing) {
			return;
		}
		setTimeout(() => {
			this.draw();
			this.update();
			this.loop();
		}, this.fps);
	}

	play() {
		this.playing = true;
		this.loop();
	}

	pause() {
		this.playing = false;
	}

	changeScreen(Screen, ...screenArgs) {
		if(this.screen) {
			this.unloadScreen();
			this.screen.disposeEventListeners();
		}

		this.screen = new Screen(this, ...screenArgs);

		this.loadScreen(() => {
			this.screen.initEventListeners();
			this.screen.initialize(this, ...screenArgs);
		});
	}

	loadScreen(callback = _.noop) {
		if(!this.screen.load) {
			return callback();
		}

		this.screen.lading = true;
		let loadSize = 0;

		const onload = _.after(loadSize, () => {
			delete this.screen.loading;
			callback();
		});

		const assetsLoader = new Engine.AssetsLoader(() => {
			loadSize++;
			return () => onload();
		});

		let screenAssets = this.screen.load(assetsLoader);
		this.screen.assets = _.extend({}, this.screen.assets, screenAssets);
	}

	unloadScreen() {
		const assetsNames = this.screen.unload && this.screen.unload();
		this.assets = _.omit(this.assets, assetsNames);
	}

	extendAssets(assets) {
		this.assets = _.extend({}, this.assets, assets);
	}

	clearAssets() {
		this.assets = {};
	}

	addEventListener(type, listener, target) {
		const boundListener = listener.bind(target);
		this.events.set(listener, boundListener);
		this.canvas.addEventListener(type, boundListener, false);
	}

	removeEventListener(type, listener) {
		const boundListener = this.events.get(listener);
		this.events.delete(listener);
		this.canvas.removeEventListener(type, boundListener, false);
	}
}

function onKeyDown(e) {
	e.preventDefault();
	this.keyStates.add(e.keyCode);
}

function onKeyUp(e) {
	e.preventDefault();
	this.keyStates.remove(e.keyCode);
}
