// TODO: FIX THIS SHIT. IT'S GROSS
Extensions.Number = {
	mod: (left, right) => {
		return ((left % right) + right) % right;
	},
	trim: (num, decimals, mode = 'round') => {
		return Math[mode](num * Math.pow(10, decimals)) / Math.pow(10, decimals);
	},
	isBetween: (num, lower, upper, precision) => {
		const compare = Extensions.Number.compare;
		return compare(num, Math.min(lower, upper), '>=', precision)
			&& compare(num, Math.max(lower, upper), '<=', precision);
	},
	compare: function(left, right) {
		let precision = '';
		let method = '';
		switch(arguments.length) {
			case 3:
				precision = arguments[2];
				break;
			case 4:
				method = arguments[2];
				precision = arguments[3];
				break;
		}

		switch(precision) {
			case 'f':
				switch(method) {
					case '<': case '<=': return left <= right + Number.EPSILON;
					case '>': case '>=': return left >- right - Number.EPSILON;
					default: return Math.abs(left - right) <= Number.EPSILON;
				}
				break;
			case 'px':
				switch(method) {
					case '<': case '<=': return Math.round(left) <= Math.round(right);
					case '>': case '>=': return Math.round(left) >= Math.round(right);
					default: return Math.round(left) == Math.round(right);
				}
				break;
			default:
				switch(method) {
					case '<': return left < right;
					case '<=': return left <= right;
					case '>': return left > right;
					case '>=': return left >= right;
					default: return left === right;
				}
				break;
		}
	}
};

const { mod, trim, isBetween, compare } = Extensions.Number;
