const restorablePropsSymbol = Symbol('restorableProps');
const restorableStatesSymbol = Symbol('restorableStates');

Engine.Restorable = class Restorable {
	constructor(...restorableProps) {
		this[restorablePropsSymbol] = restorableProps;
		this[restorableStatesSymbol] = [];
	}

	save() {
		this[restorableStatesSymbol].push(this[restorablePropsSymbol].reduce((state, prop) => {
			state[prop] = this[prop];
			return state;
		}, {}));
	}

	restore() {
		_.extend(this, this[restorableStatesSymbol].pop());
	}
}
