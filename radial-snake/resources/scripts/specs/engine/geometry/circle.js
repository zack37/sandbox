describe('Engine.Geometry.Circle tests', () => {
	let circle;

	beforeEach(() => {
		circle = new Engine.Geometry.Circle(1, 1, 5, 0, 1.5 * Math.PI);
	});

	describe('#getX', () => {

		it('returns x given inranged rad', () => {
			expect(circle.getX(0 * Math.PI)).toBeCloseTo(6);
			expect(circle.getX(0.5 * Math.PI)).toBeCloseTo(1);
			expect(circle.getX(1 * Math.PI)).toBeCloseTo(-4);
			expect(circle.getX(1.5 * Math.PI)).toBeCloseTo(1);
		});

		it('returns nothing given outranged rad', () => {
			expect(circle.getX(2*Math.PI)).toBeUndefined();
		});

	});

	describe('#getY', () => {

		it('returns y given inranged rad', () => {
			expect(circle.getY(0 * Math.PI)).toBeCloseTo(1);
			expect(circle.getY(0.5 * Math.PI)).toBeCloseTo(6);
			expect(circle.getY(1 * Math.PI)).toBeCloseTo(1);
			expect(circle.getY(1.5 * Math.PI)).toBeCloseTo(-4);
		});

		it('returns nothing given outranged rad', () => {
			expect(circle.getY(2*Math.PI)).toBeUndefined();
		});

	});

	describe('#getRad', () => {

		it('returns rad given inranged point', () => {
			const x = -3.0450849718747346;
			const y = 3.9389262614623686;
			expect(circle.getRad(x, y)).toBeCloseTo(0.8 * Math.PI);
		});

		it('returns nothing given outranged point', () => {
			const x = 5.045084971874736;
			const y = -1.9389262614623664;
			expect(circle.getRad(x, y)).toBeUndefined();
		});

	});

	describe('#getCircleIntersection', () => {

		it('returns array with itersection points given circle with 2 intersection points', () => {
			const c = new Engine.Geometry.Circle(-5, 1, 5, 0, 2 * Math.PI);
			expect(circle.getCircleIntersection(c)).toEqual([
				 { x: -2, y: -3 },
				 { x: -2, y: 5 }
			]);
		});

		it('returns array with itersection points given circle with 1 intersection point', () => {
			const c = new Engine.Geometry.Circle(-5, 1, 5, 0, Math.PI);
			expect(circle.getCircleIntersection(c)).toEqual([
				 { x: -2, y: 5 }
			]);
		});

		it('returns array with itersection points given kissing circle', () => {
			const c = new Engine.Geometry.Circle(-9, 1, 5, 0, 2 * Math.PI);
			expect(circle.getCircleIntersection(c)).toEqual([
				 { x: -4, y: 1 },
			]);
		});

		it('returns nothing given outer circle', () => {
			const c = new Engine.Geometry.Circle(10, 10, 2, 0, 2 * Math.PI);
			expect(circle.getCircleIntersection(c)).toBeUndefined();
		});

		it('returns nothing given inner circle', () => {
			const c = new Engine.Geometry.Circle(1, 1, 2, 0, 2 * Math.PI);
			expect(circle.getCircleIntersection(c)).toBeUndefined();
		});

	});

	describe('#getLineIntersection', () => {

		it('returns array with intersection points given line with 2 intersection points', () => {
			const l = new Engine.Geometry.Line(-10, 1, 10, 1);

			expect(circle.getLineIntersection(l)).toEqual([
				{ x: 6, y: 1 },
				{ x: -4, y: 1 }
			]);
		});

		it('returns array with intersection point given line with 1 intersection point', () => {
			const l = new Engine.Geometry.Line(-10, 1, 1, 1);

			expect(circle.getLineIntersection(l)).toEqual([
				{ x: -4, y: 1 }
			]);
		});

		it('returns array with intersection point given kissing line', () => {
			const l = new Engine.Geometry.Line(-10, 6, 10, 6);

			expect(circle.getLineIntersection(l)).toEqual([
				{ x: 1, y: 6 }
			]);
		});

		it('returns nothing given outraged line', () => {
			const l = new Engine.Geometry.Line(-10, 10, 10, 10);

			expect(circle.getLineIntersection(l)).toBeUndefined();
		});

	});

});
