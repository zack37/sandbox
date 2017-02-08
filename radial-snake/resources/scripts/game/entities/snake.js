Game.Entities.Snake = class Snake {
	constructor(x, y, r, rad, v, color, keyStates, options) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.rad = rad;
		this.v = v;
		this.color = color;
		this.keyStates = keyStates;
		this.shapes = [];
		this.currentShape = new Engine.Geometry.Line(x, y, x, y);
		this.shapes.push(this.currentShape);
		this.score = options.score || 0;

		if(options.keys) {
			this.leftKey = options.keys.left;
			this.rightKey = options.keys.right;
		}
		else {
			this.leftKey = 37;
			this.rightKey = 39;
		}
	}

	draw(context) {
		this.shapes.forEach(shape => {
			context.save();
			context.strokeStyle = this.color;
			context.lineWidth = 3;
			context.beginPath();

			shape.draw(context);

			context.stroke();
			context.restore();
		});
	}

	update(span, width, height) {
		const step = (this.v * span) / 1000;

		this.updateShapes(step, width, height);
		this.cycleThrough(step, width, height);
	}

	updateShapes(step, width, height, options = {}) {
		this.updateCurrentShape(step, options);
		this.updateDirection(step, options);
	}

	updateCurrentShape(step, options) {
		if(this.currentShape instanceof Engine.Geometry.Line) {
			return this.updateCurrentLine(options);
		}
		if (this.currentShape instanceof Engine.Geometry.Circle) {
			return this.updateCurrentCircle(options);
		}
	}

	updateCurrentLine(options) {
		const lastX = options.lastX || this.x;
		const lastY = options.lastY || this.y;
		this.x = options.x || this.currentShape.x2;
		this.y = options.y || this.currentShape.y2;
		this.lastBit = new Engine.Geometry.Line(lastX, lastY, this.x, this.y);
	}

	updateCurrentCircle(options) {
		const lastX = options.lastX || this.currentShape.x;
		const lastY = options.lastY || this.currentShape.y;
		const lastR = options.lastR || this.currentShape.r;

		if(this.direction === 'left') {
			const lastRad = this.rad + (0.5 * Math.PI);
			const currentShapePoint = this.currentShape.getPoint(this.currentShape.rad1);
			this.x = options.x || currentShapePoint.x;
			this.y = options.y || currentShapePoint.y;
			this.rad = this.currentShape.rad1 - (0.5 * Math.PI);
			this.lastBit = new Engine.Geometry.Circle(lastX, lastY, lastR, this.currentShape.rad1, lastRad);
		}
		else {
			const lastRad = this.rad - (0.5 * Math.PI);
			const currentShapePoint = this.currentShape.getPoint(this.currentShape.rad2);
			this.x = options.x || currentShapePoint.x;
			this.y = options.y || currentShapePoint.y;
			this.rad = this.currentShape.rad2 + (0.5 * Math.PI);
			this.lastBit = new Engine.Geometry.Circle(lastX, lastY, lastR, lastRad, this.currentShape.rad2);
		}
	}

	updateDirection(step, options) {
		let direction;
		if(this.keyStates.get(this.leftKey)) {
			direction = 'left';
		}
		else if(this.keyStates.get(this.rightKey)) {
			direction = 'right';
		}

		this.changeDirection(step, direction, options);
		this.continueDirection(step, direction, options);
	}

	changeDirection(step, direction, options) {
		if(direction === this.direction && !options.force) {
			return;
		}

		this.direction = direction;
		let angle, rad, x, y;

		switch(direction) {
			case 'left':
				angle = this.rad - (0.5 * Math.PI);
				rad = this.rad + (0.5 * Math.PI);
				x = this.x + (this.r * Math.cos(angle));
				y = this.y + (this.r * Math.sin(angle));
				this.currentShape = new Engine.Geometry.Circle(x, y, this.r, rad, rad);
				break;
			case 'right':
				angle = this.rad + (0.5 * Math.PI);
				rad = this.rad - (0.5 * Math.PI);
				x = this.x + (this.r * Math.cos(angle));
				y = this.y + (this.r * Math.sin(angle));
				this.currentShape = new Engine.Geometry.Circle(x, y, this.r, rad, rad);
				break;
			default:
				this.currentShape = new Engine.Geometry.Line(this.x, this.y, this.x, this.y);
				break;
		}

		this.shapes.push(this.currentShape);
	}

	continueDirection(step, direction) {
		switch(direction) {
			case 'left':
				this.currentShape.rad1 -= step / this.r;
				break;
			case 'right':
				this.currentShape.rad2 += step / this.r;
				break;
			default:
				this.currentShape.x2 += step * Math.cos(this.rad);
				this.currentShape.y2 += step * Math.sin(this.rad);
				break;
		}
	}

	cycleThrough(step, width, height) {
		let intersectionPoint = this.getCanvasIntersection(width, height);

		if(!intersectionPoint) {
			return;
		}

		intersectionPoint = intersectionPoint[0];

		if(intersectionPoint.x % width === 0) {
			this.x = mod(this.x - width, width);
		}
		if(intersectionPoint.y % height === 0) {
			this.y = mod(this.y - height, height);
		}

		this.updateShapes(step, width, height, {
			force: true,
			lastX: this.x,
			lastY: this.y,
			x: this.x,
			y: this.y
		});
	}

	getSelfIntersection() {
		if(this.currentShape instanceof Engine.Geometry.Circle
			&& Math.abs(this.currentShape.rad1 - this.currentShape.rad2) >= 2 * Math.PI) {
			const rad = this.direction === 'left'
				? this.currentShape.rad1
				: this.currentShape.rad2;
			return this.currentShape.getPoint(rad);
		}

		return this.shapes.slice(0, -2).find(shape => this.lastBit.getIntersection(shape));
	}

	getSnakeIntersection(snake) {
		return snake.shapes.find(shape => this.lastBit.getIntersection(shape));
	}

	getCanvasIntersection(width, height) {
		const canvasPolygon = new Engine.Geometry.Polygon(
			[0,0,width,0],
			[width, 0, width, height],
			[width, height, 0, height],
			[0, height, 0, 0]
		);

		return canvasPolygon.getIntersection(this.lastBit);
	}

}
