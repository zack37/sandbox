const alignmentMap = sprite => {
	const alignmentMap = {};
	alignmentMap['top-left'] = alignmentMap['left-top'] = () => ({ x: 0, y: 0 });
	alignmentMap['top-right'] = alignmentMap['right-top'] = () => ({ x: sprite.width, y: 0 });
	alignmentMap['bottom-left'] = alignmentMap['left-bottom'] = () => ({ x: 0, y: sprite.height });
	alignmentMap['bottom-right'] = alignmentMap['right-bottom'] = () => ({ x: sprite.width, y: sprite.height });
	alignmentMap['middle'] = alignmentMap['center'] = () => ({ x: sprite.width/2, y: sprite.height/2 });
	alignmentMap['left'] = () => ({ x: 0, y: sprite.height/2 });
	alignmentMap['top'] = () => ({ x: sprite.width/2, y: 0 });
	alignmentMap['right'] = () => ({ x: sprite.wifth, y: sprite.height/2 });
	alignmentMap['bottom'] = () => ({ x: sprite.width/2, y: sprite.height/2 });

	return alignmentMap;
};

const getAlignment = (sprite, align, fallback) => {
	const adjustment = alignmentMap(sprite)[align] || (() => fallback);
	return adjustment();
};

Engine.Sprite = class Sprite {
	constructor(texture) {
		this.texture = texture;
		this.x = this.y = 0;
		this.width = texture.width;
		this.height = texture.height;
		this.pivot = { x: 0, y: 0 };
		this.opacity = 1;
	}

	draw(context, offsetX = 0, offsetY = 0) {
		context.save();
		context.globalAlpha = this.opacity;
		this.pivot = getAlignment(this, this.align, this.pivot);

		context.drawImage(
			this.texture,
			(this.x - this.pivot.x) + offsetX,
			(this.y - this.pivot.y) + offsetY,
			this.width, this.height
		);

		context.restore();
	}

	setPercentage(key, relative, percents, ...adapters) {
		const oldVal = this[key];
		const newVal = this[key] = (percents * relative) / 100;
		const ratio = newVal / oldVal;

		adapters.forEach(adapter => {
			this[adapter] *= ratio;
		})
	}

}
