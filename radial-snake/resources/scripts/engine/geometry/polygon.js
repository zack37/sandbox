Engine.Geometry.Polygon = class Polygon {
	constructor(...bounds) {
		this.bounds = bounds.map(c => new Engine.Geometry.Line(...c));
	}

	hasPoint(x, y) {
		return this.bounds.some(b => b.hasPoint(x, y));
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

	getShapeIntersection(shape) {
		const result = _(this.bounds)
			.flatMap(x => shape.getLineIntersection(x))
			.filter(x => x != null)
			.value();

		if(result.length) {
			return result;
		}
	}

	getLineIntersection(line) {
		return this.getShapeIntersection(line);
	}

	getCircleIntersection(circle) {
		return this.getShapeIntersection(circle);
	}

	getPolygonIntersection(polygon) {
		return this.getShapeIntersection(polygon);
	}
}
