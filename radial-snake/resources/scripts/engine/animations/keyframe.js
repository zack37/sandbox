const repetitionMap = ({
	none: (keyframe, span) => {
		keyframe.frame += span;
		if(keyframe.frame > keyframe.lastFrame) {
			keyframe.frame = keyframe.lastFrame;
			keyframe.playing = false;
		}
	},
	cyclic: keyframe => {
		keyframe.frame = keyframe.age % keyframe.lastFrame;
	},
	full: keyframe => {
		keyframe.frame = keyframe.age % keyframe.lastFrame;
		const animationComplete = (keyframe.age / keyframe.lastFrame) % 2 >= 1;
		if(animationComplete) {
			keyframe.frame = keyframe.lastFrame - keyframe.frame;
		}
	}
});

const easingMap = {
	in: r => Math.sin((r*Math.PI) / 2),
	out: r => Math.sin((r*Math.PI) / 2)
};

Engine.Animations.Keyframe = class Keyframe {
	constructor(sprite, keyframes) {
		this.sprite = sprite;
		this.keyframes = keyframes;
		this.age = 0;
		this.frame = 0;
		this.repetitionMode = 'none';
		this.lastKeyframe = _.last(keyframes);
		this.lastFrame = this.lastKeyframe.frame;

		this.animables = [ 'x', 'y', 'width', 'height', 'opacity' ];

		this.trimmedKeyframes = this.animables.reduce((trimmedKeyframes, key) => {
			trimmedKeyframes[key] = keyframes.filter(x => x[key] != null);
			return trimmedKeyframes;
		}, {});

		_.each(keyframes[0], (value, key) => {
			if(this.animables.includes(key)) {
				sprite[key] = value;
			}
		});
	}

	draw(context, offsetX, offsetY) {
		this.sprite.draw(context, offsetX, offsetY);
	}

	update(span) {
		if(!this.playing) {
			return;
		}

		this.age += span;

		repetitionMap[this.repetitionMode](this, span);

		this.animables.forEach(k => {
			const motion = this.getKeyframeMotion(k);
			if(motion) {
				this.sprite[k] = this.calculateRelativeValue(motion, k);
			}
		});
	}

	play() {
		this.playing = true;
	}

	pause() {
		this.playing = false;
	}

	getKeyframeMotion(key) {
		const keyframes = this.trimmedKeyframes[key];

		if(!keyframes || keyframes.length < 2 || this.frame > _.last(keyframes).frame) {
			return;
		}

		const start = this.findStartKeyframe(keyframes);
		const end = this.findEndKeyframe(keyframes);
		const ratio = this.getKeyframesRatio(start, end);

		return { start, end, ratio };
	}

	getKeyframesRatio(start, end) {
		return (this.frame - start.frame) / (end.frame - start.frame);
	}

	findEndKeyframe(keyframes) {
		return _.find(keyframes, kf => kf.frame >= (this.frame || 1));
	}

	findStartKeyframe(keyframes) {
		const idx = _.findIndex(keyframes, kf => kf.frame >= (this.frame || 1));
		return keyframes[idx - 1];
	}

	calculateRelativeValue(motion, key) {
		const a = motion.start[key];
		const b = motion.end[key];
		let r = motion.ratio;
		const easing = r > 0 ? motion.start.easing : motion.end.easing;

		switch(easing) {
			case 'in':
				r = Math.sin((r*Math.PI) / 2);
				break;
			case 'out':
				r = Math.cos((r*Math.PI) / 2);
				break;
		}
		// r = (easingMap[easing] ||  _.identity)(r);

		return ((b - a) * r) + a;
	}
}
