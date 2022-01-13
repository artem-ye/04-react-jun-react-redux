function thunk(store) {
	return function wrapDispatch(next) {
		return function handleAction(action) {   
			// console.log(typeof action);
			if (typeof action === 'function') {
				action(store.dispatch, store.getState);
				// console.log('do nothing....');
			} else {
				return next(action);
			}			
		}
	}
}

export {thunk};
export default thunk;
