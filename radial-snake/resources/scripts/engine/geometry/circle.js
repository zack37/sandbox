Engine.Geometry.Circle = class Circle {
	constructor(x, y, r, rad1, rad2) {
		this.x = trim(x, 9);
		this.y = trim(y, 9);
		this.r = trim(r, 9);

		if(rad1 > rad2) {
			this.rad1 = trim(rad1, 9, 'floor');
			this.rad2 = trim(rad2, 9, 'ceil');
		}
		else {
			this.rad1 = trim(rad1, 9, 'ceil');
			this.rad2 = trim(rad2, 9, 'floor');
		}
	}

	draw(context) {
		context.arc(this.x, this.y, this.r, this.rad1, this.rad2);
	}

	getX(rad) {
		if(!isBetween(trim(rad, 9), this.rad1, this.rad2)) {
			return;
		}
		return trim(this.r * Math.cos(rad) + this.x, 9);
	}

	getY(rad) {
		if(!isBetween(trim(rad, 9), this.rad1, this.rad2)) {
			return;
		}
		return trim(this.r * Math.sin(rad) + this.y, 9);
	}

	getPoint(rad) {
		if(!isBetween(rad, this.rad1, this.rad2)) {
			return;
		}
		return {
			x: trim(this.r * Math.cos(rad) + this.x, 9),
			y: trim(this.r * Math.sin(rad) + this.y, 9)
		};
	}

	getRad(x, y) {
		const rad = Math.atan2(y - this.y, x - this.x);
		if(rad != null && isBetween(rad, this.rad1, this.rad2)) {
			return rad;
		}

		const cycRad = Math.abs(this.rad1) > Math.abs(this.rad2) ? this.rad1 : this.rad2;

		// mine
		if(isBetween(trim(rad + (2 * Math.PI * Math.floor(cycRad / (2 * Math.PI))), 9), this.rad1, this.rad2)
			|| isBetween(trim(rad + (2 * Math.PI * Math.ceil(cycRad / (2 * Math.PI))), 9), this.rad1, this.rad2)) {
			return rad;
		}
	}

	hasPoint(x, y) {
		return this.getRad(x, y) != null;
	}

	getIntersection(shape) {
		if(shape instanceof Engine.Geometry.Line) {
			return this.getLineIntersection(shape);
		}
		else if (shape instanceof Engine.Geometry.Circle) {
			return this.getCircleIntersection(shape);
		}
		else if (shape instanceof Engine.Geometry.Polygon) {
			return this.getPolygonIntersection(shape);
		}
	}

	getCircleIntersection(circle) {
		const dx = circle.x - this.x;
		const dy = circle.y - this.y;
		const d = Math.sqrt(dx**2 + dy**2);

		if(d > this.r + circle.r || d < Math.abs(this.r - circle.r)) {
			return;
		}

		const a = ((this.r**2 - circle.r**2) + d**2) / (2*d);
		const x = this.x + ((dx * a) / d);
		const y = this.y + ((dy * a) / d);
		const h = Math.sqrt(this.r**2 - a**2);
		const rx = (- dy * h) / d;
		const ry = (dx * h) / d;

		let interPoints = _([ { x: x+rx, y: y+ry }, { x: x - rx, y: y - ry } ])
			.map(p => ({ x: trim(p.x, 9), y: trim(p.y, 9) }))
			.uniqWith(_.isEqual)
			.value();

		[this, circle].forEach(c => {
			interPoints = interPoints.filter(p => c.hasPoint(p.x, p.y));
		});

		if(interPoints.length) {
			return interPoints;
		}
	}

	getLineIntersection(line) {
		const x1 = line.x1 - this.x;
		const x2 = line.x2 - this.x;
		const y1 = line.y1 - this.y;
		const y2 = line.y2 - this.y;
		const dx = x2 - x1;
		const dy = y2 - y1;
		const d = Math.sqrt(dx**2 + dy**2);
		const h = (x1 * y2) - (x2 * y1);
		const delta = (this.r**2 * d**2) - h**2;

		if(delta < 0) {
			return;
		}

		const interPoints = _([
			{
				x: (((h * dy) + (((dy / Math.abs(dy)) || 1) * dx * Math.sqrt(delta))) / Math.pow(d, 2)) + this.x,
				y: (((-h * dx) + (Math.abs(dy) * Math.sqrt(delta))) / Math.pow(d, 2)) + this.y
			},
			{
				x: (((h * dy) - (((dy / Math.abs(dy)) || 1) * dx * Math.sqrt(delta))) / Math.pow(d, 2)) + this.x,
				y: (((-h * dx) - (Math.abs(dy) * Math.sqrt(delta))) / Math.pow(d, 2)) + this.y
			}
		])
		.map(p => ({ x: trim(p.x, 9), y: trim(p.y, 9) }))
		.filter(p => this.hasPoint(p.x, p.y) && line.boundsHavePoint(p.x, p.y))
		.uniqWith(_.isEqual)
		.value();

		if(interPoints.length) {
			return interPoints;
		}
	}

	getPolygonIntersection(polygon) {
		return polygon.getCircleIntersection(this);
	}
}
