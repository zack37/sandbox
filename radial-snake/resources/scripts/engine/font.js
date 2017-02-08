const srcSymbol = Symbol('src');

Engine.Font = class Font extends Engine.Restorable {
	get src() {
		return this[srcSymbol];
	}

	set src(src) {
		this[srcSymbol] = src;

		const done = this.onload ? _.after(2, this.onload) : _.noop;

		this.atlas = new Image();
		this.atlas.onload = done;
		this.atlas.src = `${src}.png`;

		$.getJSON(`${src}.json`, data => {
			this.data = data;
			done();
		});

		return this[srcSymbol];
	}

	constructor() {
		super('color');
		this.charSpritesCache = {};
	}

	createTexture(text, options = {}) {
		const { noOffsets, noSpaces } = options;
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		const height = canvas.height = this.data.height;
		const width = canvas.width = _.reduce(text, (width, c) => {
			return noSpaces
				? width + this.getCharSprite(c).width
				: width + this.data.chars[c].width;
		}, 0);

		if(this.size) {
			const ratio = this.size / this.data.size;
			canvas.height *= ratio;
			canvas.width *= ratio;
			context.scale(ratio, ratio);
		}

		let offset = 0;

		_.map(text, char => this.getCharSprite(char))
			.forEach((charSprite, index) => {
				const charData = this.data.chars[text.charAt(index)];

				if(noOffsets) {
					charSprite.draw(context, offset);
				}
				else {
					charSprite.draw(context, offset + charData.offset.x, charData.offset.y);
				}

				offset += noSpaces ? charSprite.width : charData.width;

				if(this.color) {
					const overlayCanvas = document.createElement('canvas');
					const overlayContext = overlayCanvas.getContext('2d');
					overlayCanvas.width = width;
					overlayCanvas.height = height;
					overlayContext.beginPath();
					overlayContext.rect(0, 0, width, height);
					overlayContext.fillStyle = this.color;
					overlayContext.fill();

					context.save();
					context.globalCompositeOperation = 'source-in';
					context.drawImage(overlayCanvas, 0, 0);
					context.restore();
				}
			});

		return canvas;
	}

	getCharSprite(char) {
		if(this.charSpritesCache[char]) {
			return this.charSpritesCache[char];
		}

		const { x, y, width, height } = this.data.chars[char].rect;
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		canvas.width = width;
		canvas.height = height;
		context.drawImage(this.atlas, x, y, width, height, 0, 0, width, height);

		return this.charSpritesCache[char] = new Engine.Sprite(canvas);
	}
}
