describe('Engine.Geometry.Line tests', () => {
	let line;

	beforeEach(() => {
		line = new Engine.Geometry.Line(-5, -5, 5, 5);
	});

	describe('#getX', () => {

		it('returns x for inranged y', () => {
			expect(line.getX(1)).toBeCloseTo(1);
		});

		it('returns nothing for outranged y', () => {
			expect(line.getX(10)).toBeUndefined();
		});

	});

	describe('#getY', () => {

		it('returns y for inranged x', () => {
			expect(line.getY(1)).toBeCloseTo(1);
		});

		it('returns nothing for outranged x', () => {
			expect(line.getY(10)).toBeUndefined();
		});

	});

	describe('#hasPoint', () => {

		it('returns true given contained point', () => {
			expect(line.hasPoint(1, 1)).toBeTruthy();
		});

		it('returns false given uncontained point', () => {
			expect(line.hasPoint(10, 10)).toBeFalsy();
		});

	});

	describe('##getLineIntersection', () => {

		it('returns intersection point given intersecting line', () => {
			const l = new Engine.Geometry.Line(1, -5, 1, 5);
			expect(line.getLineIntersection(l)).toEqual({ x: 1, y: 1 });
		});

		it('returns nothing given parallel line', () => {
			const l = new Engine.Geometry.Line(-5, -6, 5, 4);
			expect(line.getLineIntersection(line)).toBeUndefined();
		});

		it('returns nothing given outranged line', () => {
			const l = new Engine.Geometry.Line(10, 10, 10, 15);
			expect(line.getLineIntersection(line)).toBeUndefined();
		});

	});

});
