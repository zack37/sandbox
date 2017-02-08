describe('Engine.Geometry.Polygon tests', () => {
	let polygon;

	beforeEach(() => {
		polygon = new Engine.Geometry.Polygon(
			[0,0,5,0],
			[5,0,5,5],
			[5,5,0,5],
			[0,5,0,0]
		);
	});

	describe('#hasPoint', () => {

		it('returns true given contained point', () => {
			expect(polygon.hasPoint(5, 3)).toBeTruthy();
		});

		it('returns false given outranged point', () => {
			expect(polygon.hasPoint(10, 10)).toBeFalsy();
		});

	});

	describe('#getLineIntersection', () => {

		it('returns intersection point given intersecting line', () => {
			const line = new Engine.Geometry.Line(0, 1, 5, 4);
			expect(polygon.getLineIntersection(line)).toEqual([
				{ x: 5, y: 4 },
				{ x: -0, y: 1 }
			]);
		});

		it('returns nothing given outranged line', () => {
			const line = new Engine.Geometry.Line(10, 11, 15, 14);
			expect(polygon.getLineIntersection(line)).toBeUndefined();
		});

	});

	describe('#getCircleIntersection', () => {

		it('returns array with intersection points given circle with 2 interssection points', () => {
			const circle = new Engine.Geometry.Circle(0, 0, 2, 0, 2 * Math.PI);
			expect(polygon.getCircleIntersection(circle)).toEqual([
				{ x: 2, y: 0 },
				{ x: 0, y: 2 }
			]);
		});

		it('returns array with intersection point given circle with 1 intersection point', () => {
			const circle = new Engine.Geometry.Circle(0, 0, 2, 0, 0.25 * Math.PI);
			expect(polygon.getCircleIntersection(circle)).toEqual([
				{ x: 2, y: 0 }
			]);
		});

		it('returns array with intersection point given kissing circle', () => {
			const circle = new Engine.Geometry.Circle(-3, 3, 3, 0, 2 * Math.PI);
			expect(polygon.getCircleIntersection(circle)).toEqual([
				{ x: 0, y: 3 }
			]);
		});

		it('return nothing given outer circle', () => {
			const circle = new Engine.Geometry.Circle(10, 10, 2, 0, 2 * Math.PI);
			expect(polygon.getCircleIntersection(circle)).toBeUndefined();
		});

		it('returns nothing given inner circle', () => {
			const circle = new Engine.Geometry.Circle(2.5, 2.5, 2, 0, 2 * Math.PI);
			expect(polygon.getCircleIntersection(circle)).toBeUndefined();
		});

	});

});
