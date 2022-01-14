// export function createSore(reducer, initialState) {
// 	let state = initialState;
// 	const listeners = [];

// 	const getState = () => {
// 		return state;
// 	}

// 	const dispatch = (action) => {		
// 		state = reducer(state, action);
// 		listeners.forEach(listener => listener(state));
// 	}

// 	const subscribe = (listener) => {
// 		listeners.push(listener);
// 	}

// 	return {
// 		getState, dispatch, subscribe
// 	}
// };

