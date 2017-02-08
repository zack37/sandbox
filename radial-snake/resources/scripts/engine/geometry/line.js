Engine.Geometry.Line = class Line {
	constructor(x1, y1, x2, y2) {
		this.x1 = trim(x1, 9);
		this.y1 = trim(y1, 9);
		this.x2 = trim(x2, 9);
		this.y2 = trim(y2, 9);
	}

	draw(context) {
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
	}

	getX(y) {
		const x = trim(((((y - this.y1) * (this.x2 - this.x1)) / (this.y2 - this.y1)) + this.x1), 9);
		if(isNaN(x) || isBetween(x, this.x1, this.x2)) {
			return x;
		}
	}

	getY(x) {
		const y = trim(((((x - this.x1) * (this.y2 - this.y1)) / (this.x2 - this.x1)) + this.y1), 9);
		if(isNaN(y) || isBetween(y, this.y1, this.y2)) {
			return y;
		}
	}

	hasPoint(x, y) {
		if(!this.boundsHavePoint(x, y)) {
			return false;
		}
		const m = trim(((this.y2 - this.y1) / (this.x2 - this.x1)), 9);
		return (y - this.y1) / (x - this.x1) == m;
	}

	boundsHavePoint(x, y) {
		return isBetween(x, this.x1, this.x2) && isBetween(y, this.y1, this.y2);
	}

	getIntersection(shape) {
		if(shape instanceof Engine.Geometry.Line) {
			return this.getLineIntersection(shape);
		}
		if(shape instanceof Engine.Geometry.Circle) {
			return this.getCircleIntersection(shape);
		}
		if(shape instanceof Engine.Geometry.Polygon) {
			return this.getPolygonIntersection(polygon);
		}
	}

	getLineIntersection(line) {
		if(!(((this.x1 - this.x2) * (line.y1 - line.y2)) - ((this.y1 - this.y2) * (line.x1 - line.x2)))) {
			return;
		}
		const x = trim(
			((((this.x1 * this.y2) - (this.y1 * this.x2)) * (line.x1 - line.x2)) - ((this.x1 - this.x2) * ((line.x1 * line.y2) - (line.y1 * line.x2)))) /
				(((this.x1 - this.x2) * (line.y1 - line.y2)) - ((this.y1 - this.y2) * (line.x1 - line.x2)))
			, 9);
		const y = trim(
			((((this.x1 * this.y2) - (this.y1 * this.x2)) * (line.y1 - line.y2)) - ((this.y1 - this.y2) * ((line.x1 * line.y2) - (line.y1 * line.x2)))) /
				(((this.x1 - this.x2) * (line.y1 - line.y2)) - ((this.y1 - this.y2) * (line.x1 - line.x2)))
			, 9);
		if(isBetween(x, this.x1, this.x2) && isBetween(x, line.x1, line.x2)
			&& isBetween(y, this.y1, this.y2) && isBetween(y, line.y1, line.y2)) {
			return { x, y };
		}
	}

	getCircleIntersection(circle) {
		return circle.getLineIntersection(this);
	}

	getPolygonIntersection(polygon) {
		return polygon.getLineIntersection(this);
	}
}
